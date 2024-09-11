import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server'
import { URL } from 'url'

export async function PATCH(req: Request, { params }: { params: { roomId: string } }) {
    try {
        const body = await req.json();
        const roomId = params.roomId
        if (!roomId) return new NextResponse("invalid room", { status: 409 })
        const { categoryId, imageName, isFeatured } = body;
        if (!categoryId) {
            return new NextResponse("Missing required fields", { status: 400 })
        }
        const existingCategory = await prismadb.category.findUnique({
            where: {
                id: categoryId
            }
        })

        const room = await prismadb.room.update({
            where: {
                id: roomId
            },
            data: {
                name: String(existingCategory?.name),
                price: Number(existingCategory?.price),
                categoryId: existingCategory?.id,
                image: imageName,
                isFeatured: isFeatured
            }
        })
        return NextResponse.json({ success: true, room })
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
export async function DELETE(req: Request, { params }: { params: { roomId: string } }) {
    try {
        const roomId = params.roomId
        if (!roomId) return new NextResponse("invalid room", { status: 409 })

        const room = await prismadb.room.delete({
            where: {
                id: roomId
            }
        })
        return NextResponse.json({ success: true, room })
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}