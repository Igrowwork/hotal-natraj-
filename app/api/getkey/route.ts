import { NextResponse } from 'next/server'


export async function POST() {
    const key = process.env.RAZORPAY_API_KEY!

    return NextResponse.json({success: true, key})
}

