import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const body = await req.json();
    const { name, price } = body;
    if (!name || !price || !params.categoryId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    const category = await prismadb.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        ...body,
      },
    });
    await prismadb.room.updateMany({
      where: {
        categoryId: params.categoryId,
      },
      data: {
        price: category.price,
        name: category.name,
      },
    });
    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    const category = await prismadb.category.delete({
      where: {
        id: params.categoryId,
      },
    });
    await prismadb.room.deleteMany({
      where: {
        categoryId: params.categoryId,
      },
    });
    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
