"use client"

import { Booking } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { BookCellAction } from "./booking-cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Details = Booking
export const columns: ColumnDef<Details>[] = [
    {
        accessorKey: "username",
        header: "Customers",
    },
    {
        accessorKey: "useremail",
        header: "Email",
    },
    {
        accessorKey: "userphone",
        header: "Phone",
    },
    {
        accessorKey: "childrens",
        header: "Children"
    },
    {
        accessorKey: "adults",
        header: "Adults"
    },
    {
        accessorKey: "roomtype",
        header: "Room Category"
    },
    {
        accessorKey: "roomnumbers",
        header: "Rooms Count"
    },
    {
        accessorKey: "startDate",
        header: "Check-in",
    },
    {
        accessorKey: "endDate",
        header: "Check-out",
    },
    {
        accessorKey: "totalPrice",
        header: "Total Amt.",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => <BookCellAction data={row.original}/>
    },
]
