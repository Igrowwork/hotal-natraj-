import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server'
import { instance } from '@/lib/razorpay'

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {amount} = body
        if(!amount){
            return new NextResponse("Missing Data is required", {status: 409})
        }
        const options = {
            amount: Number(amount) * 100,  // amount in the smallest currency unit
            currency: "INR",
        };
        const order = await instance.orders.create(options);

        return NextResponse.json({ success: true, order })
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}