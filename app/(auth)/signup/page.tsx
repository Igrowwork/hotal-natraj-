import React from 'react'
import { SignUpForm } from '../components/signup-form'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <main className='h-screen w-full flex justify-center items-center'>
      <div className='h-full w-full lg:w-1/2 flex flex-col gap-10 justify-center items-center'>
        <h2 className='text-3xl font-medium'>{`Get Started Now`}</h2>
        <div className='px-[10%] w-full sm:w-2/3'>
          <SignUpForm />
        </div>
        <div className='text-sm'>
          {`Already have an account? `}
          <Link href={'/login'} className='text-primary underline'>{`Log in`}</Link>
        </div>
      </div>
      <div className='flex lg:w-1/2'>
        <div className='relative h-screen w-full'>
          <Image src={'/assets/images/signup-img.jpg'} alt='' fill className='object-cover rounded-tl-3xl rounded-bl-3xl' />
        </div>
      </div>
    </main>
  )
}
