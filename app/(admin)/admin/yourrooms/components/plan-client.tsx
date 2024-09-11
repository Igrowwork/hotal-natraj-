import { Separator } from '@/components/ui/separator'
import React from 'react'
import { DataTable } from '../../components/data-table'
import { PlanColumn, PlanColumns } from './plan-column-def'


interface PlanClientProps {
    data: PlanColumn[]
}
export default function PlanClient({ data }: PlanClientProps) {
    return (
        <>
            <Separator />
            <DataTable searchKey='name' columns={PlanColumns} data={data} />
        </>
    )
}