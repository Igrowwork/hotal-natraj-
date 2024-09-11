"use client";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface AdminSidebarProps {
  categoreis: Category[];
}

const AdminSidebar = ({ categoreis }: AdminSidebarProps) => {
  const startDate = new Date();
  const endDate = new Date();

  const formattedStartDate = format(startDate, "yyyy-MM-dd");
  const formattedEndDate = format(endDate, "yyyy-MM-dd");

  const path = usePathname();
  const navData = [
    {
      label: "Overview",
      href: "/admin/overview",
      active: path === "/admin/overview",
      svgName: "group.png",
    },
    {
      label: "All Bookings",
      href: "/admin",
      active: path === "/admin",
      svgName: "group.png",
    },
    {
      label: "Your Rooms",
      href: "/admin/yourrooms",
      active: path === "/admin/yourrooms",
      svgName: "rooms.png",
    },
    {
      label: "Offline Booking",
      href: `/admin/offlinebooking?categoryId=${categoreis[0]?.id}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
      active:
        path ===
        `/admin/offlinebooking?categoryId=${categoreis[0]?.id}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
      svgName: "group.png",
    },
  ];
  return (
    <div className="min-h-screen h-full w-full bg-primary rounded-tr-[18px]">
      <div className="h-full w-full flex justify-center pt-32">
        <ul className="flex flex-col gap-6 py-4 text-[#ABA8C1] text-xl w-full px-2">
          {navData.map((data, index) => (
            <li
              key={index}
              className={cn(
                "flex w-full pl-5",
                data.active
                  ? "text-primary bg-[#EAEFF6] p-2 rounded-md pl-5 font-medium"
                  : ""
              )}
            >
              <Link href={data.href} className={cn("flex gap-2 items-center")}>
                <div className="relative h-6 w-6">
                  <Image
                    src={`/assets/images/${data.svgName}`}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                {data.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
