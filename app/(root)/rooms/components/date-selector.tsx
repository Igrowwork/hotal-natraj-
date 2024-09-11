"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  CalendarDays,
  CheckCircle,
  ChevronUp,
  Filter,
  Search,
} from "lucide-react";
import { format, isBefore, parseISO, subDays } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import FilterCategory from "@/components/filter";
import { useRouter, useSearchParams } from "next/navigation";
import { SelectSingleEventHandler } from "react-day-picker";

export default function DateSelector() {
  const searchParams = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const checkinDateobject = parseISO(startDate!);
  const checkoutDateobject = parseISO(endDate!);

  // const [checkInDate, setCheckInDate] = React.useState<Date>(checkinDateobject)
  // const [checkOutDate, setcheckOutDate] = React.useState<Date>(checkoutDateobject)
  // const router = useRouter()

  // const handleSearchClick = () => {
  //   if (!checkInDate || !checkOutDate) {
  //     router.push(`/rooms?startDate=${format(new Date(), "yyyy-MM-dd")}&endDate=${format(new Date(), "yyyy-MM-dd")}`)
  //   } else {
  //     const newCheckInDate = format(checkInDate, "yyyy-MM-dd")
  //     const newCheckOutDate = format(checkOutDate, "yyyy-MM-dd")
  //     router.push(`/rooms?startDate=${newCheckInDate}&endDate=${newCheckOutDate}`)
  //   }
  // }

  const [checkInDate, setCheckInDate] = React.useState(new Date());
  const [checkOutDate, setCheckOutDate] = React.useState(new Date());
  const router = useRouter();

  const handleCheckInDateSelect: SelectSingleEventHandler = (date) => {
    if (date instanceof Date) {
      setCheckInDate(date);
    }
  };

  const handleCheckOutDateSelect: SelectSingleEventHandler = (date) => {
    if (date instanceof Date) {
      setCheckOutDate(date);
    }
  };

  const handleSearchClick = () => {
    const newCheckInDate = format(checkInDate, "yyyy-MM-dd");
    const newCheckOutDate = format(checkOutDate, "yyyy-MM-dd");
    router.push(
      `/rooms?startDate=${newCheckInDate}&endDate=${newCheckOutDate}`
    );
  };

  return (
    <>
      <div className="flex justify-center h-full w-full px-4">
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-3 items-center md:gap-6 h-fit w-full mx-auto py-5 max-w-6xl sm:-ml-4 lg:mx-auto lg:pl-40 mx-auto">
          <Popover>
            <div className="flex justify-center items-center w-full sm:border-r-2 sm:col-span-2 lg:col-span-1">
              <div className="flex gap-2 md:gap-5 items-center md:-ml-3 lg:-ml-5 h-fit w-fit">
                <PopoverTrigger asChild>
                  <div className="cursor-pointer hover:bg-primary hover:text-white duration-150 ease-in-out p-2 sm:p-4 h-10 sm:h-14 w-10 sm:w-14 lg:h-16 lg:w-16 bg-primary/30 rounded-full">
                    <CalendarDays className="h-full w-full" />
                  </div>
                </PopoverTrigger>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs sm:text-base">Check-in Date</h3>
                  <span
                    className={cn(
                      "select-none text-sm sm:text-lg lg:text-xl font-semibold"
                    )}
                  >
                    {checkInDate
                      ? format(checkInDate, "PPP")
                      : format(new Date(), "PPP")}
                  </span>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkInDate}
                      onSelect={handleCheckInDateSelect}
                      disabled={(date) =>
                        isBefore(date, subDays(new Date(), 1)) ||
                        date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </div>
              </div>
            </div>
          </Popover>
          <Popover>
            <div className="flex justify-center items-center sm:col-span-2 lg:col-span-1">
              <div className="flex gap-2 md:gap-5 items-center">
                <PopoverTrigger asChild>
                  <div className="cursor-pointer hover:bg-primary hover:text-white duration-150 ease-in-out p-2 sm:p-4 h-10 sm:h-14 w-10 sm:w-14 lg:h-16 lg:w-16 bg-primary/30 rounded-full">
                    <CalendarDays className="h-full w-full" />
                  </div>
                </PopoverTrigger>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs sm:text-base">Check-out Date</h3>
                  <span
                    className={cn(
                      "select-none text-sm sm:text-lg lg:text-xl font-semibold"
                    )}
                  >
                    {checkOutDate
                      ? format(checkOutDate, "PPP")
                      : format(new Date(), "PPP")}
                  </span>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkOutDate}
                      onSelect={handleCheckOutDateSelect}
                      disabled={(date) =>
                        isBefore(date, subDays(new Date(), 1)) ||
                        date < new Date("1900-01-01") ||
                        date < checkInDate
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </div>
              </div>
            </div>
          </Popover>
          {/* <div className='col-span-2 sm:col-span-1 my-4 sm:my-0 flex justify-center sm:justify-start items-center'>
            <div className='flex gap-4 items-center justify-center bg-primary text-white cursor-pointer h-fit w-full sm:w-fit sm:px-6 py-2 sm:py-3 sm:text-lg rounded' onClick={handleSearchClick}>
              Search
              <Search className='h-6 w-6' />
            </div>
          </div> */}
        </div>
      </div>

      {/* <div className='lg:hidden'>
        <Dialog>
          <DialogTrigger asChild>
            <div className='text-white text-lg mb-5 pr-[5%] flex justify-end'><span className='bg-primary px-4 py-2 rounded-lg flex gap-2 w-fit'><Filter />{`filter`}</span></div>
          </DialogTrigger>
          <DialogContent className="w-[90%] rounded-lg">
            <DialogHeader>
              <DialogTitle>{`Select Filter`}</DialogTitle>
            </DialogHeader>
            <div className='flex flex-col gap-6 lg:w-1/2 md:w-[75%]'>
              <div className='flex justify-between items-center'>
                <h3 className='text-xl font-semibold'>{`Durations`}</h3>
                <ChevronUp />
              </div>
              <div className='flex flex-col gap-5 items-start'>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className={cn("w-full flex justify-between items-center text-[#A6AAACCC] font-normal p-3 border border-[#0F1416] rounded-xl", checkInDate ? "text-black" : "")}>
                      {checkInDate ? format(checkInDate, "PPP") : <span>Check in</span>} <CalendarDays />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkInDate}
                      //@ts-ignore
                      onSelect={(date) => setCheckInDate(date)}
                      disabled={(date) =>
                        isBefore(date, subDays(new Date(), 1)) || date < new Date("1900-01-01")
                    }
                      initialFocus

                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <button className={cn("w-full flex justify-between items-center text-[#A6AAACCC] font-normal p-3 border border-[#0F1416] rounded-xl", checkOutDate ? "text-black" : "")}>
                      {checkOutDate ? format(checkOutDate, "PPP") : <span>Check out</span>} <CalendarDays />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkOutDate}
                      //@ts-ignore
                      onSelect={(date) => setcheckOutDate(date)}
                      disabled={(date) =>
                        isBefore(date, subDays(new Date(), 1)) || date < new Date("1900-01-01")
                    }
                      initialFocus

                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className='flex flex-col gap-6 w-[90%]'>
              <div className='flex justify-between items-center'>
                <h3 className='text-xl font-semibold'>{`Room Categories`}</h3>
                <ChevronUp />
              </div>
              <div>
                <ul className='flex flex-col gap-3 text-lg font-medium'>
                  <li className='flex gap-4'><CheckCircle />{`All Rooms`}</li>
                  <li className='flex gap-4'><CheckCircle />{`Budget Rooms`}</li>
                  <li className='flex gap-4'><CheckCircle />{`Semi-Deluxe Rooms`}</li>
                  <li className='flex gap-4'><CheckCircle />{`Deluxe Rooms`}</li>
                  <li className='flex gap-4'><CheckCircle />{`Luxury Rooms`}</li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className='text-white bg-primary text-lg'>{`Apply Filter`}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className='hidden lg:w-[30%] h-screen lg:flex flex-col items-center gap-14'>
        <div className='flex flex-col gap-6 xl:w-1/2 md:w-2/3'>
          <div className='flex justify-between items-center'>
            <h3 className='text-xl font-semibold'>{`Durations`}</h3>
            <ChevronUp />
          </div>
          <div className='flex flex-col gap-5 items-start'>
            <Popover>
              <PopoverTrigger asChild>
                <button className={cn("w-full flex justify-between items-center text-[#A6AAACCC] font-normal p-3 border border-[#0F1416] rounded-xl", checkInDate ? "text-black" : "")}>
                  {checkInDate ? format(checkInDate, "PPP") : <span>Check in</span>} <CalendarDays />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkInDate}
                  //@ts-ignore
                  onSelect={(date) => setCheckInDate(date)}
                  initialFocus
                  disabled={(date) =>
                    isBefore(date, subDays(new Date(), 1)) || date < new Date("1900-01-01")
                }
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <button className={cn("w-full flex justify-between items-center text-[#A6AAACCC] font-normal p-3 border border-[#0F1416] rounded-xl", checkOutDate ? "text-black" : "")}>
                  {checkOutDate ? format(checkOutDate, "PPP") : <span>Check out</span>} <CalendarDays />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkOutDate}
                  //@ts-ignore
                  onSelect={(date) => setcheckOutDate(date)}
                  initialFocus
                  disabled={(date) =>
                    isBefore(date, subDays(new Date(), 1)) || date < new Date("1900-01-01")
                }
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button onClick={handleSearchClick} className='text-white bg-primary text-lg'>{`Apply Changes`}</Button>
        </div>
        <div className='flex flex-col gap-6 lg:w-2/3 xl:w-1/2'>
          <div className='flex justify-between items-center'>
            <h3 className='text-xl font-semibold'>{`Room Categories`}</h3>
            <ChevronUp />
          </div>
          <div>
            <FilterCategory categories={categories} valueKey='categoryId' />
          </div>
        </div>
      </div> */}
    </>
  );
}
