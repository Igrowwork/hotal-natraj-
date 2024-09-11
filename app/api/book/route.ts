import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { userId, roomIds, startDate, endDate, totalPrice, selectedPlan, username, useremail, userphone, adults, children } = await req.json();
        if (!userId || !roomIds || !startDate || !endDate || !totalPrice || !username || !useremail || !userphone || !adults) {
            return new NextResponse('Missing required data', { status: 400 });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            return new NextResponse('Invalid date range', { status: 400 });
        }

        // Check availability for all selected rooms
        const conflictingBookings = await Promise.all(
            roomIds.map(async (roomId: any) => {
                const existingBookings = await prismadb.bookingRoom.findMany({
                    where: {
                        roomId: roomId,
                        booking: {
                            startDate: {
                                lte: end,
                            },
                            endDate: {
                                gte: start,
                            },
                            status: 'Booked',
                        },
                    },
                });
                return existingBookings.length > 0;
            })
        );

        if (conflictingBookings.some((conflict) => conflict)) {
            return new NextResponse('One or more rooms are already Booked', {
                status: 409,
            });
        }

        const roomName = await prismadb.room.findFirst({
            where:{
                id: roomIds[0]
            }
        })

        // Create a booking record
        const booking = await prismadb.booking.create({
            data: {
                startDate: start,
                endDate: end,
                user: {
                    connect: {
                        id: userId,
                    },
                },
                adults: adults,
                roomtype: roomName?.name,
                roomnumbers: roomIds.length,
                totalPrice: parseFloat(totalPrice),
                selectedPlan: selectedPlan,
                username: username,
                useremail: useremail,
                userphone: userphone,
                childrens: children,
                rooms: {
                    createMany: {
                        data: roomIds.map((roomId: any) => ({
                            roomId: roomId,
                        })),
                    },
                },
            },
            include: {
                rooms: true,
            },
        });

        return NextResponse.json({ success: true, booking });
    } catch (error) {
        console.error(error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
