import { options } from '@/app/api/auth/[...nextauth]/options'
import { Minus } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import BookingDetails from './_components/booking-details'

export default async function Page() {
    const user = await getServerSession(options)
    if (!user) {
        redirect('/login?callback=/your-bookings')
    }
    const data = await prismadb.user.findUnique({
        where: {
            //@ts-ignore
            id: user.user?.id
        },
        select: {
            bookings: true,
        }
    })

    return (
        <main>
            <div className='w-full max-w-7xl mx-auto flex flex-col items-center gap-12 py-28'>
                <h2 className='text-5xl font-semibold text-primary'>Your Bookings</h2>
                <BookingDetails bookings={data?.bookings!}/>
            </div>
        </main>
    )
}
