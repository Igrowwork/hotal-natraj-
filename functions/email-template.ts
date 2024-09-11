"use server";
import { format } from "date-fns";
import nodemailer from "nodemailer";
import prismadb from "@/lib/prismadb";

export async function emailSender(props: any) {
  const roomId = await prismadb.room.findFirst({
    where: {
      id: props.rooms[0].roomId,
    },
  });

  const transporter = await nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: "test@igrowmybiz.com",
      pass: "Text_1234",
    },
  });

  const mailOpionts = {
    from: "test@igrowmybiz.com",
    to: props.useremail,
    subject: "Booking Confirmation",
    html: `<div style="width: 100%;">
        <p style="text-align: center;">Thanks for choosing us</p>
        <h1 style="text-align: center;">Invoice</h1>
    
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
                <th
                    style="width: 40%; border: 1px solid #ddd; padding: 10px; text-align: left; background-color: #f2f2f2;">
                    Booking ID</th>
                <td style="width: 60%; border: 1px solid #ddd; padding: 10px; text-align: left;">${
                  props.id
                }</td>
            </tr>
            <tr>
                <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Room Category</th>
                <td style="border: 1px solid #ddd; padding: 10px; text-align: left;">${
                  props.roomtype
                }</td>
            </tr>
            <tr>
                <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Number of Rooms</th>
                <td style="border: 1px solid #ddd; padding: 10px; text-align: left;">${
                  props.roomnumbers
                }</td>
            </tr>
            <tr>
                <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Selected Plan</th>
                <td style="border: 1px solid #ddd; padding: 10px; text-align: left;">${
                  props.selectedPlan
                }</td>
            </tr>
            <tr>
                <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Room Price</th>
                <td style="border: 1px solid #ddd; padding: 10px; text-align: left;">${
                  roomId?.price
                }</td>
            </tr>
            <tr>
                <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Check-In Date</th>
                <td style="border: 1px solid #ddd; padding: 10px; text-align: left;">${format(
                  new Date(props.startDate),
                  "PPP"
                )}</td>
            </tr>
            <tr>
                <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Check-Out Date</th>
                <td style="border: 1px solid #ddd; padding: 10px; text-align: left;">${format(
                  new Date(props.endDate),
                  "PPP"
                )}</td>
            </tr>
            <tr>
                <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">GST Percentage</th>
                <td style="border: 1px solid #ddd; padding: 10px; text-align: left;">18%</td>
            </tr>
            <tr class="total">
                <th
                    style="border: 1px solid #ddd; padding: 10px; text-align: left; background-color: #f2f2f2; font-weight: bold;">
                    Final Price (including GST)</th>
                <td style="border: 1px solid #ddd; padding: 10px; text-align: left; font-weight: bold;">${
                  props.totalPrice
                }</td>
            </tr>
        </table>
    </div>`,
  };
  await transporter.sendMail(mailOpionts, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
