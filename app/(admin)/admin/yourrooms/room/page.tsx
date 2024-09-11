import prismadb from '@/lib/prismadb';
import { Category, Room } from '@prisma/client';
import { RoomFormCreate } from './components/room-form-create';

export default async function Page() {
        const categories: Category[] = await prismadb.category.findMany()

        return (
            <div className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <div className='flex items-center justify-between'>
                        <RoomFormCreate  categories={categories}/>
                    </div>
                </div>
            </div>
        )
    }
