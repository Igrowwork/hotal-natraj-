import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, features, description, images , status } = body;
    if (!name || !price || !description) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    const category = await prismadb.category.create({
      data: {
        name,
        price,
        description: description,
        images: images ?? [],
        features: features ?? [],
        status : status ?? true
      },
    });
    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
