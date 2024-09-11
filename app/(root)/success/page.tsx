import nodemailer from 'nodemailer';
import { roboto, robotoFlex } from "@/app/fonts";
import prismadb from "@/lib/prismadb";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from 'react';

export default async function Page({ searchParams }: { searchParams: { bookingId: string } }) {
  try {
    const bookings = await prismadb.booking.findFirst({
      where: {
        id: searchParams.bookingId
      },
      include: {
        rooms: {
          include: {
            room: true
          }
        }
      }
    });
    return (
      <main className='min-h-screen w-full flex items-center flex-col justify-center gap-5'>
        <div className="relative flex items-center justify-center mt-28">
          <div className="relative h-[250px] w-[300px] sm:h-[400px] sm:w-[400px]">
            <Image src={'/assets/images/success-bg.png'} alt="" fill className="object-cover" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 sm:h-40 sm:w-40">
            <Image src={'/assets/images/Frame 1632.png'} alt="" fill className="object-cover" />
          </div>
        </div>
        <h2 className={cn("text-primary text-4xl sm:text-6xl font-semibold -mt-10 sm:-mt-28", robotoFlex.className)}>{`Booking Confirmed`}</h2>
        <div className="flex flex-col gap-2 mt-4 sm:mt-10 mb-4 font-medium w-full max-w-7xl mx-auto px-6">
          <p>{`We are pleased to inform you that your reservation request has been received and confirmed.`}</p>
          <p>{`Your booking is confirmed. `} <span className="text-primary font-semibold">{`THANK YOU!`}</span></p>
        </div>
        <div className="flex flex-col gap-4 w-full max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-semibold">{`Booking Details`}</h3>
          <div className="-mt-2">
            <p className="text-sm font-medium">{`Booking ID`}</p>
            <p className="text-primary font-medium">{searchParams.bookingId}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-6">
            <div className="py-2 ">
              <p>{`Room Type`}</p>
              <p className="font-semibold text-lg">{bookings?.roomtype!}</p>
            </div>
            <div className="py-2 pl-12 sm:-ml-8 border-l-primary border-l-2 border-dotted">
              <p>{`Check-in Date`}</p>
              <p className="font-semibold text-lg">{format(bookings?.startDate!, 'PPP')}</p>
            </div>
            <div className="py-2 pl-0 sm:pl-12 border-l-primary sm:border-l-2 border-dotted">
              <p>{`Check-out Date`}</p>
              <p className="font-semibold text-lg">{format(bookings?.endDate!, 'PPP')}</p>
            </div>
            <div className="py-2 pl-12 sm:pl-0 lg:pl-12 border-l-primary border-l-2 sm:border-l-0 lg:border-l-2 border-dotted">
              <p>{`Selected Plan`}</p>
              <p className="font-semibold text-lg">{bookings?.selectedPlan}</p>
            </div>
            <div className="py-2 sm:-ml-8 sm:pl-12 lg:pl-8 border-l-primary sm:border-l-2 lg:border-l-0 border-dotted">
              <p>{`Status`}</p>
              <p className="font-semibold text-lg">{bookings?.status}</p>
            </div>
            <div className="py-2 pl-12 lg:-ml-8 border-l-primary border-l-2 border-dotted">
              <p>{`Total`}</p>
              <p className="font-semibold text-lg">{bookings?.totalPrice}</p>
            </div>
          </div>
        </div>
        <Link href={'/yourbookings'} className="my-8 bg-primary text-white px-8 py-3 rounded-md">Go To Your Bookings</Link>
      </main>
    );
  } catch (error) {
    console.error("Error fetching bookings:", error);

    return (
      <main className='h-screen w-full flex items-center'>
        <p className='text-5xl text-red-500'>Error fetching bookings</p>
      </main>
    );
  }
}
