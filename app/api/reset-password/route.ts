import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { addMinutes } from "date-fns";
import nodemailer, { SendMailOptions } from "nodemailer"; // Import SendMailOptions for typing mailOptions

const sendmail = (email: string, link: string) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.MAIL_EMAIL_ADDRESS!,
      pass: process.env.MAIL_EMAIL_PASSWORD!,
    },
  });

  const mailOptions: SendMailOptions = {
    from: "Hotal natraj ",
    to: email,
    subject: "Password Reset Link",
    html: `<h1>
              ${link}
           </h1>`,
  };

  transport.sendMail(
    mailOptions,
    (err: Error | null, info: nodemailer.SentMessageInfo) => {
      if (err) {
        console.log(err, "error");
        return { success: false };
      }
      return { success: true };
    }
  );
};

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await prismadb.user.findFirst({ where: { email } });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const resetToken = uuidv4(); // Generate a unique token
    const tokenExpiration = addMinutes(new Date(), 15); // Token is valid for 15 minutes

    await prismadb.user.update({
      where: { email },
      data: {
        resetToken,
        tokenExpiration,
      },
    });
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;
    await sendmail(user.email, resetLink);
    return new NextResponse("Reset link sent", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
