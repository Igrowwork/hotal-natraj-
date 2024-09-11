import {columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import prismadb from '@/lib/prismadb';

export default async function DemoPage() {
  const data = await prismadb.booking.findMany({
    include:{
      user: true,
      rooms: {
        include: {
          room: true
        }
      }
    },
    orderBy:{
      createdAt: "desc"
    }
  })

  return (
    <div className="w-full container mx-auto px-6 bg-white">
      <div className="pt-5">
        <span className="text-3xl font-medium">{`Customer Details`}</span>
        <DataTable columns={columns} data={data} searchKey="username"/>
      </div>
    </div>
  )
}
