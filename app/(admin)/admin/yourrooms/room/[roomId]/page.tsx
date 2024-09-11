import prismadb from '@/lib/prismadb';
import { Category, Room } from '@prisma/client';
import { RoomForm } from './components/room-form';

export default async function Page({ params }: { params: { roomId: string } }) {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    let room: Room | null = null;
    if (objectIdPattern.test(params.roomId)) {
        room = await prismadb.room.findFirst({
            where: {
                id: params.roomId,
            },
            include: {
                category: true
            }
        })
        const categories: Category[] = await prismadb.category.findMany()

        return (
            <div className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <div className='flex items-center justify-between'>
                        <RoomForm intialData={room} categories={categories}/>
                    </div>
                </div>
            </div>
        )
    }
}