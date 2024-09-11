import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: Request) {
    try {
        const { response, data } = await req.json();
        const { userId, roomIds, startDate, endDate, totalPrice, selectedPlan, username, useremail, userphone, adults, children } = data;
        if (!userId || !roomIds || !startDate || !endDate || !totalPrice || !username || !useremail || !userphone || !adults) {
            return new NextResponse('Missing required data', { status: 400 });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            return new NextResponse('Invalid date range', { status: 400 });
        }

        // Check availability for each room
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
        // Calculate the totalRent per room

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

        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;


        const body = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET_KEY!).update(body.toString()).digest("hex");

        const isAuthenticated = expectedSignature === razorpay_signature

        if (!isAuthenticated) {
            return new NextResponse("invalid payment", { status: 401 })
        }

        // Create bookings for each room
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
        return NextResponse.json({ success: true, booking,});
    } catch (error) {
        console.error(error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
