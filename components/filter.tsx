"use client"
import { Category } from '@prisma/client'
import qs from 'query-string'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';


interface FilterCategoryProps {
    categories: Category[];
    valueKey: string;
}
export default function FilterCategory({ categories, valueKey }: FilterCategoryProps) {

    const searchParams = useSearchParams()
    const router = useRouter()

    const selectedValue = searchParams.get(valueKey)
    const clickHandler = (id: string) =>{
        const current = qs.parse(searchParams.toString());
        const query = {
            ...current,
            [valueKey]: id
        }
        if(current[valueKey]=== id){
            query[valueKey] = null
        }
        const url = qs.stringifyUrl({
            url: window.location.href, query},{
                skipNull: true
            });
            router.push(url);
        }



    return (
        <ul className='flex flex-col gap-3 text-lg font-medium'>
            {
                categories.map((category) => <li className={cn('flex gap-4 select-none cursor-pointer', selectedValue === category.id && 'text-primary')} key={category.id} onClick={()=> clickHandler(category.id)}>{selectedValue === category.id?<CheckCircle />:<Circle/>}{category.name}</li>)
            }
        </ul>

    )
}
