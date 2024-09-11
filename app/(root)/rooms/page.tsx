import React, { Suspense } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { IoMdArrowDropright } from "react-icons/io";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { fetchRooms } from "@/functions/fetchrooms";
import { Category, Room } from "@prisma/client";
import DateSelector from "./components/date-selector";
import { fetchCategories } from "@/functions/fetchcategory";

export default async function Page({
  searchParams,
}: {
  searchParams: { startDate: string; endDate: string };
}) {
  const fetchCategoryData = await fetchCategories();

  if (!searchParams.startDate || !searchParams.endDate) {
    redirect("/");
  }

  const fallbackSrc =
    "data:image/jpeg;base64,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";

  return (
    <main className="mt-28 flex flex-col gap-6 pb-20">
      <div>
        <DateSelector />
      </div>
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-16 px-4 sm:px-6 lg:px-8">
        {fetchCategoryData.map((data: Category) => (
          <div key={data.id}>
            <div className="w-full grid sm:grid-cols-12 shadow-[0_4px_15px_0_rgba(0,0,0,0.14)] rounded-sm overflow-hidden">
              <div className="relative h-[300px] sm:h-full w-full sm:col-span-5">
                <Image
                  src={data?.images[0] ? data?.images[0] : fallbackSrc}
                  alt="room image"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="sm:col-span-7 px-4 sm:px-6 lg:px-8 flex flex-col gap-6 py-4 lg:py-8">
                <h3 className="text-3xl font-semibold">{data.name}</h3>
                <p>{data.description}</p>
                <div className="grid grid-cols-2 gap-y-4 lg:gap-y-6 lg:py-4">
                  {
                    data.features.map((e,i)=>{
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <div key={i} className="flex gap-2">
                        <div className="relative h-6 w-6">
                          <IoMdArrowDropright />
                        </div>
                        <span>{e}</span>
                      </div>
                      )
                    })
                  }
{/*                  
                  <div className="flex gap-2">
                    <div className="relative h-6 w-6">
                      <IoMdArrowDropright />
                    </div>
                    <span>{`${4} Double bed`}</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative h-6 w-6">
                      <IoMdArrowDropright />
                    </div>
                    <span>{`Air Conditioning`}</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative h-6 w-6">
                      <IoMdArrowDropright />
                    </div>
                    <span>{`Room Service`}</span>
                  </div> */}
                </div>
                <div className="flex justify-between py-4 sm:py-0 lg:py-2 xl:py-4 px-0">
                  <div>
                    <span className="text-3xl lg:text-2xl xl:text-3xl font-bold">
                      ₹{data.price}
                    </span>
                    <span className="text-sm">/per night</span>
                  </div>
                  <Link
                    href={`/roomdetails?id=${data.id}&startDate=${searchParams.startDate}&endDate=${searchParams.endDate}`}
                  >
                    <Button className="text-sm xl:text-lg font-medium bg-white text-primary border border-primary hover:text-white hover:bg-primary">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* <Card key={index} className='w-full mx-auto border-2'>
                                <CardHeader>
                                    <div className='h-[200px] w-full relative'>
                                        <Image src={`/assets/rooms/${data.image}`} alt='' fill className='object-cover rounded-md' />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className='flex flex-col gap-5'>
                                        <h3 className='text-3xl font-semibold'>{data.name}</h3>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex gap-2'>
                                                <div className='relative h-6 w-6'><Image src={'/assets/images/guests.png'} alt='' fill className='object-contain' /></div>
                                                <span>{`Up to ${1} guests`}</span>
                                            </div>
                                            <div className='flex gap-2'>
                                                <div className='relative h-6 w-6'><Image src={'/assets/images/bed.png'} alt='' fill className='object-contain' /></div>
                                                <span>{`${4} Double bed`}</span>
                                            </div>
                                            <div className='flex gap-2'>
                                                <div className='relative h-6 w-6'><Image src={'/assets/images/snow.png'} alt='' fill className='object-contain' /></div>
                                                <span>{`Air Conditioning`}</span>
                                            </div>
                                            <div className='flex gap-2'>
                                                <div className='relative h-6 w-6'><Image src={'/assets/images/dish.png'} alt='' fill className='object-contain' /></div>
                                                <span>{`Room Service`}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className='flex justify-between py-4 border-t mx-5 px-0'>
                                    <div>
                                        <span className='text-3xl lg:text-2xl xl:text-3xl font-bold'>₹{data.price}</span>
                                        <span className='text-sm'>/per night</span>
                                    </div>
                                    <Link href={`/roomdetails?id=${data.id}&startDate=${searchParams.startDate}&endDate=${searchParams.endDate}`}>
                                        <Button className='text-sm xl:text-lg font-medium bg-white text-primary border border-primary hover:text-white hover:bg-primary'>View Details</Button>
                                    </Link>
                                </CardFooter>
                            </Card> */}
          </div>
        ))}
      </div>
    </main>
  );
}
