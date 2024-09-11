import prismadb from '@/lib/prismadb';
import { Category } from '@prisma/client';
import { CategoryForm } from './components/category-form';

export default async function Page({ params }: { params: { categoryId: string } }) {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    let category: Category | null = null;
    if (objectIdPattern.test(params.categoryId)) {
        category = await prismadb.category.findFirst({
            where: {
                id: params.categoryId,
            }
        })
        return (
            <div className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <div className='flex items-center justify-between'>
                        <CategoryForm intialData={category}/>
                    </div>
                </div>
            </div>
        )
    }
}