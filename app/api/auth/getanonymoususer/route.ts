import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server'


export async function GET() {
    try {
        const user = await prismadb.user.findUnique({
            where:{
                email: "anonymous@hotelnatraj.com",
            },
            select:{
                id: true
            }
        })
        return NextResponse.json({ success: true, user })
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}