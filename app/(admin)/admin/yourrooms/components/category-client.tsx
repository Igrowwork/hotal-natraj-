import { Separator } from '@/components/ui/separator'
import React from 'react'
import {  columns } from './column'
import { DataTable } from '../../components/data-table'
import { CategoryColumn, CategroyColumns } from './category-column-def'


interface CategoryClientProps {
    data: CategoryColumn[]
}
export default function CategoryClient({ data }: CategoryClientProps) {
    return (
        <>
            <Separator />
            <DataTable searchKey='name' columns={CategroyColumns} data={data} />
        </>
    )
}