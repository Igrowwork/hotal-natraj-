import { Facebook, Instagram, Mail, MapPin, PhoneCall, Twitter } from 'lucide-react'
import React from 'react'
import { robotoFlex, sourcesans } from '../../fonts'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className='bg-primary pt-10 pb-4 px-[5%]'>
            <div className='h-full w-full max-w-7xl mx-auto text-white flex flex-col gap-6'>
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-0'>
                    <div className='flex flex-col gap-6'>
                        <h2 className={cn('text-3xl font-bold', robotoFlex.className)}>About Us</h2>
                        <p className='lg:w-2/3 text-justify'>{`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal`}</p>
                    </div>
                    <div className='flex flex-col gap-6 sm:pl-8 lg:pl-0'>
                        <h2 className={cn('text-3xl font-bold', robotoFlex.className)}>Navigation</h2>
                        <div className='grid grid-cols-2 gap-y-2 lg:w-4/5'>
                            <Link href={'/'} className='hover:underline w-fit'>Home</Link>
                            <Link href={'/dining'} className='hover:underline w-fit'>Dining</Link>
                            <Link href={'/aboutus'} className='hover:underline w-fit'>About Us</Link>
                            <Link href={'/gallery'} className='hover:underline w-fit'>Gallery</Link>
                            <Link href={'/rooms'} className='hover:underline w-fit'>Rooms</Link>
                            <Link href={'/contactus'} className='hover:underline w-fit'>Contact Us</Link>
                            <Link href={'/packages'} className='hover:underline w-fit'>Packages</Link>
                        </div>
                    </div>
                    <div className='grid gap-4'>
                        <div className='flex flex-col gap-6'>
                            <h3 className={cn('text-3xl font-bold', robotoFlex.className)}>Reservation</h3>
                            <div className='flex gap-3 items-center group'>
                                <span className='h-8 sm:h-10 w-8 sm:w-10 p-[7px] sm:p-[9px] rounded-full border border-white shrink-0 group-hover:scale-105 transition-all duration-300 ease-in-out'><PhoneCall className='h-full w-full' /></span>
                                <div className='flex gap-2 items-center h-fit'>
                                    <a href="tel:+919425495294" className='flex items-center gap-2 hover:scale-105 transition-all duration-200 w-fit text-sm sm:text-base'>{`+91 9425495294 ,`}</a>
                                    <a href="tel:+917869038073" className='flex items-center gap-2 hover:scale-105 transition-all duration-200 w-fit text-sm sm:text-base'>{`+91 7869038073`}</a>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-3 items-center group'>
                            <span className='h-8 sm:h-10 w-8 sm:w-10 p-[7px] sm:p-[9px] rounded-full border border-white shrink-0 group-hover:scale-105 transition-all duration-300 ease-in-out'><Mail className='h-full w-full' /></span>
                            <div>
                                {/* <a href="mailto:hotelnatrajpachmarhi@outlook.com" className='flex items-center gap-2 hover:scale-105 transition-all duration-200 w-fit text-sm sm:text-base'>{`hotelnatrajpachmarhi@outlook.com`}</a> */}
                                <a href="mailto:natrajhotelpachmarhi@gmail.com" className='flex items-center gap-2 hover:scale-105 transition-all duration-200 w-fit text-sm sm:text-base'>{`natrajhotelpachmarhi@gmail.com`}</a>
                            </div>
                        </div>
                        <div className='flex gap-3 lg:items-center group'>
                            <span className='h-8 sm:h-10 w-8 sm:w-10 p-[7px] sm:p-[9px] rounded-full border border-white shrink-0 group-hover:scale-105 transition-all duration-300 ease-in-out'><MapPin className='h-full w-full' /></span>
                            <span className='w-[70%] sm:w-[75%] lg:w-[80%] xl:w-2/3 text-center sm:text-start text-xs sm:text-sm'>{`In front of cantt bus stand main road pachmarhi, Distt-Narmadapuram (M.P.) 461881`}</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='pt-3 flex flex-col-reverse lg:flex-row gap-5 justify-between border-t border-white/10 lg:px-[10%]'>
                        <div className='flex gap-2 sm:gap-4 lg:gap-8 items-center lg:justify-start w-full'>
                            <span className='text-xs text-white/50'>{`© Copyright 2023 All Rights Reserved.`}</span>
                            <Link href={'/notice'} className='text-xs text-white/50'>Important notice*</Link>
                            <Link href={'/privacy'} className='text-xs text-white/50'>Hotel Privacy and House Rules</Link>
                            <Link href={'/'} className='text-xs text-white/50'>Cancellation Policy and Rules</Link>
                        </div>
                        <div className='flex gap-5'>
                            <a href="" className='w-fit hover:scale-110 hover:drop-shadow-2xl transition-all duration-200'><Facebook className='h-5 w-5' /></a>
                            <a href="" className='w-fit hover:scale-110 hover:drop-shadow-2xl transition-all duration-200'><Instagram className='h-5 w-5' /></a>
                            <a href="" className='w-fit hover:scale-110 hover:drop-shadow-2xl transition-all duration-200'><Twitter className='h-5 w-5' /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
