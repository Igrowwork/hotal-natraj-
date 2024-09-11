import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb';



export async function POST(req: Request) {
    const { bookingId } = await req.json()
    if (!bookingId) {
        return new NextResponse("Invalid Booking ID", { status: 400, statusText: "Invalid Booking ID" })
    }
    try {
        const isBookingBooked = await prismadb.booking.findUnique({
            where:{
                id: bookingId
            }
        })

        if(isBookingBooked?.status !== "Booked"){
            return new NextResponse("Cannot Cancel Cancelled or Completed Booking", {status: 400, statusText: "Cannot Cancel Cancelled or Completed Booking"})
        }

        await prismadb.booking.update({
            where: {
                id: bookingId
            },
            data: {
                status: "Cancelled"
            }
        })
        return new NextResponse("Successfully Cancelled", {status: 200, statusText: "Successfully cancelled"})
    } catch (error) {
        //@ts-ignore
        return new NextResponse(error.message, { status: 500 })
    }
}

