import React from 'react'
import prismadb from '@/lib/prismadb'
import Heading from '../components/heading'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard, IndianRupee, Package } from 'lucide-react'
import { GraphData } from '../components/graph-data'
import { Booking } from '@prisma/client'


const totalBookings = async () => {
    const bookings = await prismadb.booking.findMany({
        where: {
            NOT:{
                status: 'Cancelled'
            }
        }
    })
    return bookings
}

const totalRooms = async () => {
    const rooms = await prismadb.room.findMany()
    return rooms
}

interface GraphData {
    name: string,
    total: number
}

const extractMonthAndTotalPrice = (data: Booking[]) => {
    const result: { month: string; totalPrice: number }[] = [];

    data.forEach((booking: Booking) => {
        const monthString = new Date(booking.createdAt).toLocaleString('en-US', { month: 'short' });
        const existingMonthIndex = result.findIndex((entry) => entry.month === monthString);

        if (existingMonthIndex !== -1) {
            // If the month already exists in the result array, add the totalPrice
            result[existingMonthIndex].totalPrice += booking.totalPrice || 0;
        } else {
            // If the month doesn't exist, create a new entry
            result.push({ month: monthString, totalPrice: booking.totalPrice || 0 });
        }
    });

    return result;
};

export default async function Page() {
    const getBookings = await totalBookings()
    const getRooms = await totalRooms()
    const getextractedData = extractMonthAndTotalPrice(getBookings)
    const totalSum = getBookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);
    return (
        <main className='bg-white rounded-md p-5 flex flex-col gap-5'>
            <Heading title='Overview' />
            <Separator />
            <div className='grid gap-4 grid-cols-3'>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Total Revenue
                        </CardTitle>
                        <IndianRupee className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>
                            {totalSum}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Total Bookings
                        </CardTitle>
                        <CreditCard className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>
                            {getBookings.length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Total Rooms
                        </CardTitle>
                        <Package className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>
                            {getRooms.length}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <GraphData  data={getextractedData}/>
        </main>
    )
}
