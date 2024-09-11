import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface AdminButtonProps {
    text: string,
    href: string
}


export default function AdminButton({href,text}:AdminButtonProps) {
    return (
        <Link href={href}>
            <Button className='text-white font-normal'><Plus className='mr-4 h-4 w-4' />{text}</Button>
        </Link>
    )
}
