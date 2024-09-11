"use client"
import { useToast } from '@/components/ui/use-toast'
import { Booking } from '@prisma/client'
import axios, { AxiosError } from 'axios'
import { format } from 'date-fns'
import { Loader, Minus } from 'lucide-react'
import React, { useState } from 'react'

interface BookingDetailsProps {
    bookings: Booking[]
}

export default function BookingDetails({ bookings }: BookingDetailsProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast()

    const isAxiosError = (error: unknown): error is AxiosError => {
        //@ts-ignore
        return error && (error as AxiosError).isAxiosError;
    };

    async function CancellBooking(id: string) {
        setIsLoading(true)
        try {
            const response = await axios.post('/api/cancelbooking', { bookingId: id })

            toast({
                title: String(response.status),
                description: response.statusText,
            })
            setIsLoading(false)
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast({
                    title: String(error.response.status),
                    description: error.response.statusText
                })
            } else {
                console.error(error);
            }
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <>
            {
                bookings.map((booking) => (<div key={booking.id} className='w-full flex flex-col gap-8 border shadow-xl p-6 rounded'>
                    <h3 className='text-4xl font-semibold'>Booking Details</h3>
                    <p className='text-2xl font-semibold -mt-6'>{format(booking.createdAt, "PPP")}</p>
                    <div className='grid grid-cols-2 pl-8 py-4'>
                        <div className='flex flex-col gap-2 text-xl'>
                            <p className='grid grid-cols-3 gap-8'>
                                <span className='flex items-center justify-between'>Booking Name <Minus className='h-4 w-4' /></span>
                                <span className='font-semibold'>{booking.username}</span>
                            </p>
                            <p className='grid grid-cols-3 gap-8'>
                                <span className='flex items-center justify-between'>Room Type <Minus className='h-4 w-4' /></span>
                                <span className='font-semibold'>{booking.roomtype}</span>
                            </p>
                            <p className='grid grid-cols-3 gap-8'>
                                <span className='flex items-center justify-between'>Plan Type <Minus className='h-4 w-4' /></span>
                                <span className='font-semibold'>{booking.selectedPlan}</span>
                            </p>
                        </div>
                        <div className='flex flex-col gap-2 text-xl'>
                            <p className='grid grid-cols-3 gap-8'>
                                <span className='flex items-center justify-between'>Check-in Date <Minus className='h-4 w-4' /></span>
                                <span className='font-semibold'>{format(booking.startDate, "PPP")}</span>
                            </p>
                            <p className='grid grid-cols-3 gap-8'>
                                <span className='flex items-center justify-between'>Check-out Date <Minus className='h-4 w-4' /></span>
                                <span className='font-semibold'>{format(booking.endDate, "PPP")}</span>
                            </p>
                            <p className='grid grid-cols-3 gap-8'>
                                <span className='flex items-center justify-between'>Status <Minus className='h-4 w-4' /></span>
                                <span className='font-semibold'>{booking.status}</span>
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center justify-end'>
                        <button disabled={isLoading} onClick={() => CancellBooking(booking.id)} className='font-semibold text-red-600 underline text-end w-fit flex items-center'>
                            {
                                isLoading && <Loader className='w-4 h-4 mr-2 animate-spin text-red-600' />
                            }
                            Cancel Booking
                        </button>
                    </div>
                </div>))
            }
        </>
    )
}
