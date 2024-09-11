import React from "react";
import { DataTable } from "../components/data-table";
import { BookingForm } from "./components/booking-form";
import { getServerSession } from "next-auth";
import prismadb from "@/lib/prismadb";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { fetchRooms } from "@/functions/fetchrooms";

const Page = async ({
  searchParams,
}: {
  searchParams: { startDate: string; endDate: string; categoryId: string };
}) => {
  const user = await getServerSession(options);
  const cateoryies = await prismadb.category.findMany();
  const fetchrooms = await fetchRooms({
    categoryId: searchParams.categoryId,
    startDate: searchParams.startDate,
    endDate: searchParams.endDate,
  });
  const plans = await prismadb.plan.findMany();
  //@ts-ignore
  const userId = user?.user?.id;
  return (
    <main className="bg-white rounded-lg p-5">
      <BookingForm
        rooms={fetchrooms.rooms}
        userId={userId}
        endDate={searchParams.endDate}
        startDate={searchParams.startDate}
        plans={plans}
        categories={cateoryies}
        defaultCategory={searchParams.categoryId}
      />
    </main>
  );
};

export default Page;
