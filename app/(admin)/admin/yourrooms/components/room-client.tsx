import { Separator } from '@/components/ui/separator'
import React from 'react'
import { RoomColumn, columns } from './column'
import { DataTable } from '../../components/data-table'


interface RoomClientProps {
    data: RoomColumn[]
}
export default function RoomClient({ data }: RoomClientProps) {
    return (
        <>
            <Separator />
            <DataTable searchKey='name' columns={columns} data={data} />
        </>
    )
}