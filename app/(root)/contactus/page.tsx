import { radley, robotoFlex, rosario } from '@/app/fonts'
import { cn } from '@/lib/utils'
import { Mail, MapPin, PhoneCall } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { ContactForm } from '../components/contact-form'

export default function Page() {
    return (
        <main>
            <section>
                <div className='h-[500px] sm:h-[600px] w-full relative flex justify-center items-center'>
                    <Image src={`/assets/images/contact.png`} alt='' fill className='object-cover' />
                    <div className='relative w-full  flex flex-col-reverse gap-4'>
                        <h1 className={cn('text-white text-6xl font-bold text-center relative z-50', radley.className)}>Contact Us</h1>
                        <h2 className={cn('text-white text-2xl font-medium text-center relative z-50', radley.className)}>Know More</h2>
                    </div>
                    <div className='h-full w-full absolute top-0 left-0 bg-black/50' />
                </div>
                <div className='h-full w-full max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 pt-16 gap-y-8'>
                    <div className='flex flex-col gap-10 sm:gap-16 lg:gap-20'>
                        <div className='flex flex-col gap-4'>
                            <h3 className={cn('text-lg sm:text-xl lg:text-2xl text-[#0F1416] uppercase', rosario.className)}>What are you waiting for...</h3>
                            <h4 className={cn("text-2xl sm:text-3xl lg:text-5xl font-bold text-primary", radley.className)}>Book Now</h4>
                            <p className='text-sm sm:text-base lg:text-xl leading-relaxed'>If you have any questions or comments, please feel free to contact us using the information below.</p>
                        </div>
                        <div className='flex flex-col gap-10'>
                            <div className='flex flex-col gap-8'>
                                <div className='flex gap-4 items-start'>
                                    <span className='h-6 sm:h-8 lg:h-9 lg:w-9 w-6 sm:w-8 p-1 sm:p-2 rounded-full border lg:border-2 border-primary text-primary shrink-0'><PhoneCall className='h-full w-full' /></span>
                                    <div className='flex flex-col gap-2'>
                                        <p className={cn('text-lg sm:text-xl lg:text-2xl text-primary', radley.className)}>Contact</p>
                                        <div className='flex gap-4'>
                                            <a href="tel:+919425495294" className='flex items-center gap-2 hover:scale-105 transition-all duration-200 w-fit text-sm sm:text-base lg:text-lg font-medium'>{`+91 9425495294`}</a>
                                            <a href="tel:+917869038073" className='flex items-center gap-2 hover:scale-105 transition-all duration-200 w-fit text-sm sm:text-base lg:text-lg font-medium'>{`+91 7869038073`}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-4 items-start'>
                                <span className='h-6 sm:h-8 lg:h-9 lg:w-9 w-6 sm:w-8 p-1 sm:p-2 rounded-full border lg:border-2 border-primary text-primary shrink-0'><Mail className='h-full w-full' /></span>
                                <div className='flex flex-col gap-2'>
                                    <p className={cn('text-lg sm:text-xl lg:text-2xl text-primary', radley.className)}>Email</p>
                                    <a href="mailto:natrajhotelpachmarhi@gmail.com" className='flex items-center gap-2 hover:scale-105 transition-all duration-200 w-fit text-sm sm:text-base lg:text-lg font-medium'>{`natrajhotelpachmarhi@gmail.com`}</a>
                                </div>
                            </div>
                            <div className='flex gap-4 lg:items-start'>
                                <span className='h-6 sm:h-8 lg:h-9 lg:w-9 w-6 sm:w-8 p-1 sm:p-2 rounded-full border lg:border-2 border-primary text-primary shrink-0'><MapPin className='h-full w-full' /></span>
                                <div className='flex flex-col gap-2'>
                                    <p className={cn('text-lg sm:text-xl lg:text-2xl text-primary', radley.className)}>Our Location</p>
                                    <span className='w-[70%] sm:w-[75%] lg:w-[85%] xl:w-3/4 text-sm sm:text-base lg:text-lg font-medium'>{`In front of cantt bus stand main road pachmarhi, Distt-Narmadapuram (M.P.) 461881`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:px-8'>
                        <ContactForm />
                    </div>
                </div>
                <div className='h-[400px] sm:h-[550px] w-full max-w-6xl mx-auto my-20'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.782517674026!2d78.43216417507469!3d22.474805579561508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397e3a32109a3f01%3A0x6c4ca9b48c438224!2sHotel%20Natraj%20Pachmarhi!5e0!3m2!1sen!2sin!4v1703675033923!5m2!1sen!2sin" style={{ border: "0" }} loading="lazy" className='h-full w-full'></iframe>
                </div>
            </section>
        </main>
    )
}
