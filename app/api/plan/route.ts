import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, description, duration, features, status } = body;
    // Validate required fields
    if (!name || !price || !duration) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    // Validate optional fields
    const validStatuses = ["ACTIVE", "INACTIVE"];
    if (status && !validStatuses.includes(status)) {
      return new NextResponse("Invalid status value", { status: 400 });
    }
    const plan = await prismadb.plan.create({
      data: {
        name,
        price,
        description,
        duration,
        features: features || [],
        status: status || "ACTIVE",
      },
    });
    return NextResponse.json({ success: true, plan });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
