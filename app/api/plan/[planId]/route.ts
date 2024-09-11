import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

// Updated PATCH method
export async function PATCH(
  req: Request,
  { params }: { params: { planId: string } }
) {
  try {
    const body = await req.json();
    const { name, price, description, duration, features, status } = body;


    // Validate planId and any fields that are provided
    if (!params.planId) {
      return new NextResponse("Missing plan ID", { status: 400 });
    }

    const validStatuses = ["ACTIVE", "INACTIVE"];
    if (status && !validStatuses.includes(status)) {
      return new NextResponse("Invalid status value", { status: 400 });
    }

    // Ensure at least one field to update is provided
    if (!name && !price && !description && !duration && !features && !status) {
      return new NextResponse("No fields to update", { status: 400 });
    }

    // Update the plan with only the provided fields
    delete body.id;
    const plan = await prismadb.plan.update({
      where: {
        id: params.planId,
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json({ success: true, plan });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Updated DELETE method
export async function DELETE(
  req: Request,
  { params }: { params: { planId: string } }
) {
  try {
    // Validate planId
    if (!params.planId) {
      return new NextResponse("Missing plan ID", { status: 400 });
    }

    const plan = await prismadb.plan.delete({
      where: {
        id: params.planId,
      },
    });

    return NextResponse.json({ success: true, plan });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
