import { robotoFlex } from '@/app/fonts'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ReviewSection = () => {

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
        {
            text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
            name: "Manav Singhaniya",
            imgPath: "review-4.png",
            location: "Bhopal, Madhya Pradesh",
        },
    ]
    
    return (
        <section className='pt-5'>
            <div className="hidden lg:flex min-h-screen w-full bg-[url('/assets/images/review-img.jpg')] bg-cover bg-center flex-col lg:flex-row gap-3 relative">
                <div className='bg-white/70 h-full w-full absolute top-0 left-0' />
                <div className='lg:w-1/2 w-full flex flex-col gap-12 relative z-10 h-fit my-auto pl-[5%] xl:pl-[10%]'>
                    <div>
                        <h2 className='text-5xl xl:text-6xl font-semibold'>{`What Our Customer’s Say About Us`}</h2>
                        <p className='text-lg xl:text-xl'>{`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`}</p>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <div className='w-2/3 flex flex-col gap-2'>
                            <p className='text-sm xl:text-base'>{`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.`}</p>
                            <div className='flex gap-5'>
                                <div className='relative h-12 w-12 rounded-full overflow-hidden'><Image src={'/assets/images/review-4.png'} alt='' fill className='object-cover' /></div>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-sm xl:text-base font-medium'>{`Manav Singhaniya`}</p>
                                    <span className='text-xs'>
                                        {`Bhopal, Madhya Pradesh`}
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
                        </div>
                        <div className='flex justify-end w-full'>
                            <div className='w-2/3 flex flex-col gap-2'>
                                <p className='text-sm xl:text-base'>{`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.`}</p>
                                <div className='flex gap-5'>
                                    <div className='relative h-12 w-12 rounded-full overflow-hidden'><Image src={'/assets/images/review-4.png'} alt='' fill className='object-cover' /></div>
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-sm xl:text-base font-medium'>{`Manav Singhaniya`}</p>
                                        <span className='text-xs'>
                                            {`Bhopal, Madhya Pradesh`}
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className='md:w-1/2 w-full h-full flex items-center relative my-auto'>
                    <div className='relative h-[370px] w-full'><Image src={'/assets/images/glob-map.png'} alt='' fill className='object-contain' /></div>
                    <div className='absolute top-0 left-0 z-10 h-full w-full'>
                        <div className='absolute h-10 w-10 rounded-full overflow-hidden top-[28%] left-[11%]'><Image src={'/assets/images/review-1.png'} alt='' fill className='object-cover' /></div>
                        <div className='absolute h-10 w-10 rounded-full overflow-hidden top-[40%] left-[28%]'><Image src={'/assets/images/review-2.png'} alt='' fill className='object-cover' /></div>
                        <div className='absolute h-12 w-12 rounded-full overflow-hidden top-[60%] left-[33%]'><Image src={'/assets/images/review-3.png'} alt='' fill className='object-cover' /></div>
                        <div className='absolute h-10 w-10 rounded-full overflow-hidden top-[27%] left-[50%]'><Image src={'/assets/images/review-4.png'} alt='' fill className='object-cover' /></div>
                        <div className='absolute h-9 w-9 rounded-full overflow-hidden top-[52%] left-[58%]'><Image src={'/assets/images/review-5.png'} alt='' fill className='object-cover' /></div>
                        <div className='absolute h-9 w-9 rounded-full overflow-hidden top-[29%] left-[88%]'><Image src={'/assets/images/review-6.png'} alt='' fill className='object-cover' /></div>
                        <div className='absolute h-11 w-11 rounded-full overflow-hidden top-[41.5%] left-[77%]'><Image src={'/assets/images/review-7.png'} alt='' fill className='object-cover' /></div>
                        <div className='absolute h-10 w-10 rounded-full overflow-hidden top-[66%] left-[84%]'><Image src={'/assets/images/review-8.png'} alt='' fill className='object-cover' /></div>
                    </div>
                </div>
            </div>

            <div className='lg:hidden flex flex-col gap-5'>
                <div className='flex flex-col gap-3 items-center'>
                    <h2 className={cn("text-3xl text-center text-primary w-4/5 sm:w-[40%] font-bold", robotoFlex.className)}>{`What Our Customer’s Say About Us`}</h2>
                    <p className="text-lg text-center w-[90%] sm:w-[60%]">{`It is a long established fact that aof a page when looking at its layout.`}</p>
                </div>
                <div className='px-[10%] sm:px-[8%] h-full w-full my-5 overflow-scroll flex gap-5 custom-scrollbar'>
                    {reviewData.map((data, index) => (<div key={index} className='w-5/6 sm:w-[60%] flex flex-col gap-2 sm:gap-4 p-5 bg-[#F2F5F8] rounded-lg min-w-[280px] sm:min-w-[416px] shrink-0 grow-0'>
                        <p className='text-xs sm:text-base'>{data.text}</p>
                        <div className='flex gap-5'>
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
    )
}

export default ReviewSection
