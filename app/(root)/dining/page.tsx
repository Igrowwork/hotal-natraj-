import { radley, robotoFlex } from '@/app/fonts'
import { cn } from '@/lib/utils'
import { Clock, Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function Page() {

    const reviewData = [
        {
            text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
            name: "Manav Singhaniya",
            imgPath: "review-4.png",
            location: "Bhopal, Madhya Pradesh",
        },
        {
            text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
            name: "Manav Singhaniya",
            imgPath: "review-4.png",
            location: "Bhopal, Madhya Pradesh",
        },
    ]

    return (
        <main>
            <section>
                <div className='h-[500px] sm:h-[600px] w-full relative flex justify-center items-center'>
                    <Image src={`/assets/images/dining.png`} alt='' fill className='object-cover' />
                    <div className='relative w-full  flex flex-col-reverse gap-4'>
                        <h1 className={cn('text-white text-6xl font-bold text-center relative z-50', radley.className)}>Restaurant Seth Saawariya ji</h1>
                        <h2 className={cn('text-white text-2xl font-medium text-center relative z-50', radley.className)}>Know More</h2>
                    </div>
                    <div className='h-full w-full absolute top-0 left-0 bg-black/50' />
                </div>
                <div className='pt-8 pb-20 w-full h-full max-w-6xl mx-auto px-6 flex flex-col gap-12'>
                    <div className='flex flex-col gap-8'>
                        <h2 className={cn('text-2xl sm:text-3xl lg:text-4xl font-bold', robotoFlex.className)}>Restaurant Seth Saawariya ji</h2>
                        <p className='-mt-4 font-semibold text-sm'>{`The multi cuisine pure veg restaurant`}</p>
                        <p className='leading-loose font-medium lg:w-2/3 text-justify'>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`}</p>
                        <div className='font-medium flex items-center gap-2 text-lg'>
                            <Clock />
                            <span>Opens at 7:30 am to 11:30 PM</span>
                        </div>
                    </div>
                    <div className='flex flex-col lg:flex-row gap-8 sm:gap-6'>
                        {reviewData.map((data, index) => (<div key={index} className='w-full lg:w-[60%] flex flex-col gap-2 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-12 bg-[#F2F5F8] rounded-lg max-w-[280px] sm:max-w-md lg:max-w-xl shrink-0 grow-0'>
                            <p className='text-xs sm:text-base'>{data.text}</p>
                            <div className='flex gap-6'>
                                <div className='relative h-12 w-12 rounded-full overflow-hidden'><Image src={`/assets/images/${data.imgPath}`} alt='' fill className='object-cover' /></div>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-sm xl:text-base font-medium'>{data.name}</p>
                                    <span className='text-xs'>
                                        {data.location}
                                        <span className='flex'>
                                            <Star className='h-4 w-4 text-yellow-400 fill-yellow-400' />
                                            <Star className='h-4 w-4 text-yellow-400 fill-yellow-400' />
                                            <Star className='h-4 w-4 text-yellow-400 fill-yellow-400' />
                                            <Star className='h-4 w-4 text-yellow-400 fill-yellow-400' />
                                            <Star className='h-4 w-4 text-yellow-400 fill-yellow-400' />
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>))}
                    </div>
                </div>
            </section>
        </main>
    )
}
