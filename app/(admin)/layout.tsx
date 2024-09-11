import React from 'react'
import AdminSidebar from './admin/components/admin-sidebar'
import AdminNavbar from './admin/components/admin-navbar'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const serversession = await getServerSession(options)
  //@ts-ignore
  const isAdmin = serversession?.user?.isAdmin
  if(!isAdmin){
    redirect('/')
  }

  const categories = await prismadb.category.findMany()

  return (
    <>
      <div className='h-full w-full flex'>
        <div className='w-[17%]'>
          <AdminSidebar categoreis={categories} />
        </div>
        <div className='w-[83%] bg-[#F5F5F5]'>
          <AdminNavbar />
          {children}
        </div>
      </div>
    </>
  )
}
