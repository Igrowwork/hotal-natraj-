import prismadb from "@/lib/prismadb";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    const user = await prismadb.user.findFirst({
      where: {
        resetToken: token,
        tokenExpiration: {
          gt: new Date(), // Check if the token is still valid
        },
      },
    });

    if (!user) {
      return new NextResponse("Invalid or expired token", { status: 400 });
    }

    if (newPassword.length < 6) {
      return new NextResponse("Password should be 6 characters long", {
        status: 400,
      });
    }

    const hashedPassword = await hash(newPassword, 8);

    await prismadb.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null, // Invalidate the token
        tokenExpiration: null,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
