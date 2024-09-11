import React from 'react'
import Heading from '../components/heading'
import AdminButton from '../components/admin-button'
import prismadb from '@/lib/prismadb';
import { RoomColumn } from './components/column';
import RoomClient from './components/room-client';
import CategoryClient from './components/category-client';
import PlanClient from './components/plan-client';


const Page = async () => {
  const rooms = await prismadb.room.findMany()
  const categories = await prismadb.category.findMany()
  const plans = await prismadb.plan.findMany()
  const formattedRoom: RoomColumn[] = rooms.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    categoryId: item.categoryId,
    isFeatured: item.isFeatured
  }))

  const formattedCategory = categories.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
  }))

  const formattedPlan = plans.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
  }))



  return (
    <main className='container flex flex-col gap-10'>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-between items-center'>
          <Heading title='Your Rooms' />
          <AdminButton href='/admin/yourrooms/room' text='Add new room' />
        </div>
        <div className='bg-white p-5 rounded-md'>
          <RoomClient data={formattedRoom} />
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-between items-center'>
          <Heading title='Your Categories' />
          <AdminButton href='/admin/yourrooms/category' text='Add new category' />
        </div>
        <div className='bg-white p-5 rounded-md'>
          <CategoryClient data={formattedCategory} />
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-between items-center'>
          <Heading title='Your Plans' />
          <AdminButton href='/admin/yourrooms/plan' text='Add new Plan' />
        </div>
        <div className='bg-white p-5 rounded-md'>
          <PlanClient data={formattedPlan} />
        </div>
      </div>
    </main>
  )
}

export default Page
