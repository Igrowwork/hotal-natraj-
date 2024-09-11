import { robotoFlex } from '@/app/fonts'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const OurServices = () => {

    const cardData = [
        {
            svgName: "people-connection.svg",
            heading: "24/7 Service",
            para: "Room service is available 24/7 to deliver food and drinks to guests room.",
        },
        {
            svgName: "fastfood.svg",
            heading: "Exceptional Food",
            para: "Choose a travel guide that is relavent to your interests and budget.",
        },
        {
            svgName: "bank.svg",
            heading: "Cozy Rooms",
            para: "These are just a few suggestions, and there are many great places to stay around the world.",
        },
        {
            svgName: "sheet.svg",
            heading: "Easily Bookings",
            para: "Experience luxury and comfort like never before. Book your stay now at our exquisite hotel.",
        },
    ]
    return (
        <section className='py-16 flex flex-col gap-10'>
            <div className='flex flex-col gap-2 items-center'>
                <h2 className={cn('text-4xl text-primary font-bold',robotoFlex.className)}>Our Services</h2>
                <p className='text-xl font-medium w-11/12 md:w-5/6 xl:w-2/3 text-center hidden lg:block'>{`Discover a world of convenience with our hotel booking platform. From a wide range of accommodations to real-time availability and secure reservations, we make planning your dream stay effortless. Plus, our expert customer support is always at your service, ensuring your trip is as your check-in.`}</p>
                <p className='text-lg text-center px-8 font-medium lg:hidden'>{`Discover a world of convenience with our hotel booking platform.`}</p>
            </div>
            <div className='h-full w-full max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-5 xl:gap-10 px-[8%] lg:px-[2%] xl:px-0'>
                {cardData.map((data, index) => (<div className='relative z-10 h-full w-full group/card' key={index}>
                    <div className='relative z-10 flex flex-col gap-5 md:gap-8 h-full w-full items-center px-5 py-5 border-2 rounded-[30px] bg-[#F5F5F5] hover:scale-105 hover:bg-[#ecf5ff59] transition-all duration-300 ease-linear hover:shadow-lg'>
                        <div className='relative h-[40px] w-[40px] md:h-20 md:w-20 xl:h-24 xl:w-24'><Image src={`/assets/svg/${data.svgName}`} alt='' fill className='object-contain' /></div>
                        <p className='font-bold text-center text-sm md:text-lg -mb-2 md:-mb-5 select-none'>{data.heading}</p>
                        <span className='text-center text-[10px] md:text-sm font-semibold text-gray-500 select-none'>{data.para}</span>
                    </div>
                    <div className='absolute h-[39px] w-[39px] sm:h-[50px] sm:w-[50px] xl:h-[70px] xl:w-[70px] bg-primary rounded-tl-[12px] xl:rounded-tl-[33px] rounded-br-xl top-[88%] -left-[15%] z-0 scale-0 group-hover/card:scale-100 transition-all duration-300 ease-in' />
                </div>))}
            </div>
        </section>
    )
}

export default OurServices
