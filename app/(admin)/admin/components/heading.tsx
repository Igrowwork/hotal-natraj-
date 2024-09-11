import React from 'react'

interface HeadingProps{
    title: string;
}

export default function Heading({title}: HeadingProps) {
  return (
    <div className='w-fit flex items-center gap-5'>
      <h1 className='text-xl font-semibold -tracking-tighter text-primary'>{title}</h1>
    </div>
  )
}
