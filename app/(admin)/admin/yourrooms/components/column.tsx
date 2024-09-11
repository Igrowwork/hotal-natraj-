"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"



export type RoomColumn = {
    id: string
    name: string
    price: number
    categoryId: string
    isFeatured: boolean
}


export const columns: ColumnDef<RoomColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "isFeatured",
        header: "Featured Room"
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
]