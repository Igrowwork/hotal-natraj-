import React from 'react'
import Image from 'next/image'
import {getServerSession} from 'next-auth/next'
import BookingForm from './components/booking-form'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

export default async function Page({searchParams}:{searchParams:{roomId: string}}) {
    const session = await getServerSession(options)

    if(!session){
        redirect(`/api/auth/signin?callbackUrl=/roomdetails/bookingdetails?roomId=${searchParams.roomId}`)
    }
    return (
        <>
            <div className='h-[600px] w-full relative flex justify-center items-center'>
                <Image src={'/assets/images/room.jpg'} alt='' fill className='object-cover' />
                <h2 className='text-blue-900 text-center text-7xl font-semibold relative' style={{ textShadow: '0px 20px 49px rgba(255,255,255,1)' }}>Booking Details</h2>
            </div>

            <div className='h-full w-full px-[5%] flex flex-col md:flex-row max-w-7xl mx-auto'>
                <div className='bg-white py-[5%] w-2/3 flex flex-col gap-5'>
                    <h2 className='text-2xl font-semibold'>Booking Form</h2>
                    <BookingForm />
                </div>
                <div className='w-1/3'>
                    
                </div>
            </div>
        </>
    )
}
