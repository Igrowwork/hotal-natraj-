import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { URL } from "url";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { categoryId, image, isFeatured, rating, description } = body;
    if (!categoryId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const existingCategory = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    const room = await prismadb.room.create({
      data: {
        name: String(existingCategory?.name),
        price: Number(existingCategory?.price),
        categoryId: existingCategory?.id,
        image,
        isFeatured,
        description,
        rating:Number(rating),
      },
    });

    return NextResponse.json({ success: true, room });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const id = searchParams.get("id") || undefined;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const start = new Date(startDate + "T00:00:00Z"); // Ensure UTC format
    const end = new Date(endDate + "T23:59:59Z"); // Ensure UTC format

    const rooms = await prismadb.room.findMany({
      where: {
        bookings: {
          none: {
            booking: {
              startDate: {
                lte: end,
              },
              endDate: {
                gte: start,
              },
              status: "Booked",
            },
          },
        },
        categoryId: categoryId,
        id: id,
      },
      include: {
        category: {
          select: {
            images: true,
          },
        },
      },
    });
    return NextResponse.json({ success: true, rooms });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
