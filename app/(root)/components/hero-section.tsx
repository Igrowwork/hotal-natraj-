"use client"

import React from 'react'
import { format, isBefore, subDays } from "date-fns"
import { CalendarDays, Calendar as CalendarIcon, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { robotoFlex } from '../../fonts'
import { useRouter } from 'next/navigation'
import { SelectSingleEventHandler } from 'react-day-picker'

const HeroSection = () => {

    const [checkInDate, setCheckInDate] = React.useState(new Date())
    const [checkOutDate, setCheckOutDate] = React.useState(new Date())
    const router = useRouter()

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
        const newCheckInDate = format(checkInDate, "yyyy-MM-dd")
        const newCheckOutDate = format(checkOutDate, "yyyy-MM-dd")
        router.push(`/rooms?startDate=${newCheckInDate}&endDate=${newCheckOutDate}`)
    }

    return (
        <section>
            <div className="h-screen w-full bg-[url('/assets/images/hero-section-img.jpg')] bg-cover flex justify-center items-center relative">
                <div className='absolute top-0 left-0 h-full w-full bg-black/70 md:bg-black/60' />
                <div className='w-full md:w-2/3 lg:w-1/2 relative z-10 flex flex-col gap-3 md:gap-6 p-[5%]'>
                    <h1 className={cn('text-5xl md:text-6xl xl:text-8xl font-bold text-white text-center', robotoFlex.className)}>{`Hotel Natraj Pachmarhi`}</h1>
                    <h2 className={cn('text-lg md:text-[20px] xl:text-3xl md:font-medium xl:font-semibold text-white text-center')}>{`Find cozy hill stations hotels for a nature-inspired gateway without any hassle.`}</h2>
                </div>
                <div className='absolute top-[80%] md:top-[82%] lg:top-[90%] flex justify-center h-full w-full px-2'>
                    <div className='h-full w-full flex flex-col'>
                        <div className='flex justify-center md:gap-6 lg:gap-10 bg-white opacity-[0.93] backdrop-blur-3xl h-fit w-full sm:w-fit mx-auto py-5 px-[4%] rounded-t-md sm:rounded-full shadow-xl'>
                            <Popover>
                                <div className='flex gap-2 md:gap-5 items-center md:-ml-3 lg:-ml-5'>
                                    <PopoverTrigger asChild>
                                        <div className='cursor-pointer hover:bg-primary hover:text-white duration-150 ease-in-out p-2 sm:p-4 h-10 sm:h-14 w-10 sm:w-14 lg:h-16 lg:w-16 bg-primary/30 rounded-full'>
                                            <CalendarDays className="h-full w-full" />
                                        </div>
                                    </PopoverTrigger>
                                    <div className='flex flex-col gap-2'>
                                        <h3 className='text-xs sm:text-base'>Check-in Date</h3>
                                        <span className={cn("text-sm sm:text-xl font-semibold select-none")}>
                                            {checkInDate ? format(checkInDate, "PPP") : format(new Date(), "PPP")}
                                        </span>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={checkInDate}
                                                onSelect={handleCheckInDateSelect}
                                                disabled={(date) =>
                                                    isBefore(date, subDays(new Date(), 1)) || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </div>
                                </div>
                            </Popover>
                            <Popover>
                                <div className='flex gap-2 md:gap-5 items-center'>
                                    <PopoverTrigger asChild>
                                        <div className='cursor-pointer hover:bg-primary hover:text-white duration-150 ease-in-out p-2 sm:p-4 h-10 sm:h-14 w-10 sm:w-14 lg:h-16 lg:w-16 bg-primary/30 rounded-full'>
                                            <CalendarDays className="h-full w-full" />
                                        </div>
                                    </PopoverTrigger>
                                    <div className='flex flex-col gap-2'>
                                        <h3 className='text-xs sm:text-base'>Check-out Date</h3>
                                        <span className={cn("select-none text-sm sm:text-xl font-semibold")}>
                                            {checkOutDate ? format(checkOutDate, "PPP") : format(new Date(), "PPP")}
                                        </span>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={checkOutDate}
                                                onSelect={handleCheckOutDateSelect}
                                                disabled={(date) =>
                                                    isBefore(date, subDays(new Date(), 1)) || date < new Date("1900-01-01") || date < checkInDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </div>
                                </div>
                            </Popover>
                            <div className='h-12 md:h-16 w-12 md:w-16 p-3 md:p-5 bg-blue-900 rounded-full md:-mr-4 lg:-mr-7 cursor-pointer hidden sm:block' onClick={handleSearchClick}>
                                <Search className='text-white h-full w-full' />
                            </div>
                        </div>
                        <div className='flex gap-4 items-center justify-center bg-primary text-white cursor-pointer h-fit w-full py-3 sm:text-lg sm:hidden rounded-b-md' onClick={handleSearchClick}>
                            Search
                            <Search className='h-6 w-6' />
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default HeroSection
