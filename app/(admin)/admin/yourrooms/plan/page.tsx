import { PlanFormCreate } from "./components/plan-form-create";

export default async function Page() {

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <div className='flex items-center justify-between'>
                    <PlanFormCreate/>
                </div>
            </div>
        </div>
    )
}
