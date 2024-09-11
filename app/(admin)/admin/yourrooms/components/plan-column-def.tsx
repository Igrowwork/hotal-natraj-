"use client"

import { ColumnDef } from "@tanstack/react-table"
import { PlanCellAction } from "./plan-cell-action"



export type PlanColumn = {
    id: string
    name: string
    price: number
}


export const PlanColumns: ColumnDef<PlanColumn>[] = [
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
        cell: ({ row }) => <PlanCellAction data={row.original}/>
    },
]