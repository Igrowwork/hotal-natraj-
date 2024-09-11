"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CategoryCellAction } from "./category-cell-action"



export type CategoryColumn = {
    id: string
    name: string
    price: number
}


export const CategroyColumns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => <CategoryCellAction data={row.original}/>
    },
]