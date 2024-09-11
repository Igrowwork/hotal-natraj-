import { NextResponse } from 'next/server'


export async function POST() {
    const endpoint = process.env.MAIN_URL!

    return NextResponse.json({ success: true, endpoint })
}

