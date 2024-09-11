import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { bookId: string } }) {
    try {
        const body = await req.json();
        const bookId = params.bookId;

        if (!bookId) return new NextResponse("Invalid booking ID", { status: 409 });

        const { userId, startDate, endDate, totalPrice, selectedPlan, username, useremail, userphone, status, rooms } = body;

        if (!userId || !startDate || !endDate || !totalPrice || !username || !useremail || !userphone) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        const updatedRooms = rooms.map((room: any) => ({
            id: room.id, // Use the unique identifier (id) of the BookingRoom
        }));

        const book = await prismadb.booking.update({
            where: {
                id: bookId
            },
            data: {
                userId,
                endDate: end,
                totalPrice: parseFloat(totalPrice),
                selectedPlan,
                startDate: start,
                useremail,
                username,
                userphone,
                status,
                rooms: {
                    set: updatedRooms,
                },
            },
            include: {
                rooms: true,
            },
        });

        return NextResponse.json({ success: true, book });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
