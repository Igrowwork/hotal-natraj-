import { radley, robotoFlex, rosario } from '@/app/fonts'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Page() {
    const startDate = new Date();
    const endDate = new Date();

    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');

    const facilities = [
        {
            icon: "about-icon-1.png",
            text: "24*7 Room Service"
        },
        {
            icon: "about-icon-2.png",
            text: "Free WiFi"
        },
        {
            icon: "about-icon-3.png",
            text: "Doctor on Call"
        },
        {
            icon: "about-icon-4.png",
            text: "Pick up and Drop"
        },
        {
            icon: "about-icon-5.png",
            text: "Pet Friendly"
        },
        {
            icon: "about-icon-6.png",
            text: "Laundry"
        },
    ]

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
            <section className='flex flex-col gap-20 pb-20'>
                <div className='h-[500px] sm:h-[600px] w-full relative flex justify-center items-center'>
                    <Image src={`/assets/images/room.jpg`} alt='' fill className='object-cover' />
                    <div className='relative w-full flex flex-col-reverse gap-4'>
                        {/* <span className='h-full w-full bg-white/30 blur-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0' /> */}
                        <h1 className={cn('text-white text-6xl font-bold text-center relative z-50', radley.className)}>About Us</h1>
                        <h2 className={cn('text-white text-2xl font-medium text-center relative z-50', radley.className)}>Know More</h2>
                    </div>
                    <div className='h-full w-full absolute top-0 left-0 bg-black/40' />
                </div>
                <div className='w-full h-full max-w-6xl mx-auto px-6 flex flex-col gap-12 -mt-10'>
                    <h2 className={cn('text-lg sm:text-xl lg:text-2xl font-medium flex flex-col gap-2 text-center', rosario.className)}>WELCOME TO THE MOST LUXURIOUS AND COMFORTABLESTAY <span className={cn('font-semibold text-2xl sm:text-4xl text-primary', rosario.className)}>IN Pachmarhi</span></h2>
                    <div className='grid sm:grid-cols-2 grid-rows-2 sm:grid-rows-1'>
                        <div className='relative h-full w-full'><Image src={'/assets/images/about-img.png'} alt='' fill className='object-cover' /></div>
                        <div className='sm:px-6 lg:px-8 px-4 py-2 sm:py-0 lg:py-2 sm:text-xl lg:text-2xl text-justify leading-none text-[#636363] flex flex-col gap-6'>
                            <p>{`We are a hotel and resort management company based in India, with a passion for hospitality and a commitment to providing our guests with exceptional experiences.`}</p>
                            <p>{`We understand that every guest is unique, and we strive to cater to their individual needs and preferences. Whether you’re looking for a romantic getaway, a family vacation, or a corporate retreat, we have something for everyone.`}</p>
                            <p>{`We are a hotel and resort management company based in India, with a passion for hospitality and a commitment to providing our guests with exceptional experiences.`}</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-center h-full w-full'>
                        <Link href={`/rooms?startDate=${formattedStartDate}&endDate=${formattedEndDate}`} className='px-8 sm:px-16 lg:px-20 py-3 bg-primary rounded-md text-white'>
                            Book Now
                        </Link>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-14 w-full h-full max-w-6xl mx-auto px-6'>
                    <h2 className={cn('text-3xl sm:text-4xl lg:text-5xl font-bold text-primary', rosario.className)}>Our facilities</h2>
                    <div className='grid grid-cols-2 sm:grid-cols-3 w-full gap-y-10 sm:gap-10 lg:gap-14'>
                        {facilities.map((fac, index) => (
                            <div key={index} className='flex flex-col gap-2 items-center'>
                                <div className='relative h-12 lg:h-16 w-full'>
                                    <Image src={`/assets/images/${fac.icon}`} alt='' fill className='object-contain' />
                                </div>
                                <p className='text-base sm:text-xl font-medium'>{fac.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col items-center gap-6 sm:gap-10 w-full h-full max-w-6xl mx-auto px-6'>
                    <h2 className={cn('text-3xl sm:text-4xl lg:text-5xl font-bold text-primary', rosario.className)}>Meet Our Team</h2>
                    <p className='text-sm sm:text-base lg:text-xl leading-snug text-center sm:w-4/5'>{`We are proud to have a team of dedicated professionals who are passionate about providing our guests with exceptional service and unforgettable experiences.`}</p>
                    <div className='h-96 sm:h-[450px] lg:h-[500px] w-full relative'>
                        <span className='h-40 w-40 sm:h-72 sm:w-72 lg:h-96 lg:w-96 rounded-full bg-primary/50 blur-3xl absolute top-5 left-[18%]' />
                        <span className='h-40 w-40 sm:h-72 sm:w-72 lg:h-96 lg:w-96 rounded-full bg-primary/50 blur-3xl absolute bottom-0 right-[20%]' />
                        <Image src='/assets/images/about-team.jpg' alt='' fill className='object-contain' />
                    </div>
                    <div className='flex flex-col gap-2 items-center'>
                        <p className={cn('text-xl leading-snug text-center', radley.className)}>Shreyas Chouhan</p>
                        <p className='text-base sm:text-lg lg:text-xl leading-snug text-center sm:w-4/5'>{`Shreyash is a seasoned professional with a deep understanding of what it takes to provide exceptional service to guests.`}</p>
                    </div>
                </div>
                <div className='w-full h-full py-4 bg-primary'>
                    <div className='h-full w-full max-w-6xl mx-auto px-6 grid sm:grid-cols-3'>
                        <div className='flex flex-col gap-4 items-center py-8'>
                            <div className='relative h-16 w-full'><Image src={'/assets/images/about-icon-7.png'} alt='' fill className='object-contain' /></div>
                            <p className={cn("text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-white", rosario.className)}>Guests Stay</p>
                            <p className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white'>5000+</p>
                        </div>
                        <div className='flex flex-col gap-4 items-center py-8 border-y-2 sm:border-y-0 sm:border-x-2 border-white'>
                            <div className='relative h-16 w-full'><Image src={'/assets/images/about-icon-8.png'} alt='' fill className='object-contain' /></div>
                            <p className={cn("text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-white", rosario.className)}>Meal Served</p>
                            <p className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white'>12560+</p>
                        </div>
                        <div className='flex flex-col gap-4 items-center py-8'>
                            <div className='relative h-16 w-full'><Image src={'/assets/images/about-icon-9.png'} alt='' fill className='object-contain' /></div>
                            <p className={cn("text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-white", rosario.className)}>Happy Clients</p>
                            <p className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white'>12000+</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-12 w-full h-full max-w-6xl mx-auto px-6'>
                    <h2 className={cn('text-3xl sm:text-4xl lg:text-5xl font-bold text-primary', rosario.className)}>See Our Guest Review</h2>
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
