import prismadb from '@/lib/prismadb';
import { Plan } from '@prisma/client';
import { PlanForm } from './components/plan-form';

export default async function Page({ params }: { params: { planId: string } }) {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    let category: Plan | null = null;
    if (objectIdPattern.test(params.planId)) {
        category = await prismadb.plan.findFirst({
            where: {
                id: params.planId,
            }
        })
        return (
            <div className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <div className='flex items-center justify-between'>
                        <PlanForm intialData={category}/>
                    </div>
                </div>
            </div>
        )
    }
}