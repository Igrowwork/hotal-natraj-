import React from 'react'
import { getServerSession } from 'next-auth'
import prismadb from '@/lib/prismadb';
import { options } from '@/app/api/auth/[...nextauth]/options'
import { fetchRooms } from '@/functions/fetchrooms';
import { UpdateBookingForm } from '../components/booking-update';
import { format } from 'date-fns';
const Page = async ({params, searchParams }: { searchParams: { startDate: string, endDate: string}, params: {bookId: string} }) => {
    const user = await getServerSession(options);
    const plans = await prismadb.plan.findMany()
    const booking = await prismadb.booking.findFirst({
        where:{
            id: params.bookId
        },
        include:{
            rooms: true,
        }
    })
    const fetchrooms = await fetchRooms({startDate: searchParams.startDate, endDate: searchParams.endDate})
    //@ts-ignore
    const userId = user?.user?.id
    return (
        <main className='bg-white rounded-lg p-5'>
            <UpdateBookingForm userId={userId} endDate={booking?.endDate} startDate={booking?.startDate} plans={plans} useremail={booking?.useremail} username={booking?.username} userphone={booking?.userphone} totalPrice={booking?.totalPrice} selectedPlan={booking?.selectedPlan} rooms={fetchrooms.rooms} bookedrooms={booking?.rooms} bookId={params.bookId} status={booking?.status}/>
        </main>
    )
}
export default Page
