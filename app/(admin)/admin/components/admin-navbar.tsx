import { AlignLeft, BellDot, UserCircle2 } from 'lucide-react'
import React from 'react'

const AdminNavbar = () => {
    return (
        <div className='py-8 px-6 h-fit w-full'>
            <div className='flex justify-between items-center bg-white p-2 rounded-lg'>
                <div>
                    <AlignLeft className='h-8 w-8' />
                </div>
                <div className='flex gap-8 items-center'>
                    <BellDot />
                    <div className='flex gap-5 items-center'>
                        <span className='flex flex-col items-end'>
                            <span>{`Hotelnatraj`}</span>
                            <span className='text-xs'>{`Admin`}</span>
                        </span>
                        <UserCircle2 className='h-8 w-8' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminNavbar
