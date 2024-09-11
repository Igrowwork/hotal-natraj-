import { radley, robotoFlex } from '@/app/fonts'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ImageGallery from './components/image-gallery'

export default function Page() {

    return (
        <main>
            <section>
                <div className='h-[500px] sm:h-[600px] w-full relative flex justify-center items-center'>
                    <Image src={`/assets/images/contact-img.jpg`} alt='' fill className='object-cover' />
                    <div className='relative w-full  flex flex-col-reverse gap-4'>
                        <h1 className={cn('text-white text-6xl font-bold text-center relative z-50', radley.className)}>Gallery</h1>
                        <h2 className={cn('text-white text-2xl font-medium text-center relative z-50', radley.className)}>Know More</h2>
                    </div>
                    <div className='h-full w-full absolute top-0 left-0 bg-black/50' />
                </div>
                {/* <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mx-auto px-6 pt-10 pb-20'>
                    {imgName.reverse().map((data, index) => (
                        <Dialog key={index}>
                            <DialogTrigger asChild>
                                <div className='relative h-full w-full row-span-12 sm:row-span-10 cursor-pointer'><Image src={`/assets/rooms/${data.img}`} alt='' fill className='object-cover object-top' /></div>
                            </DialogTrigger>
                            <DialogContent className="p-8 drop-shadow-lg h-[60vh] w-full">
                                <div className='relative h-full w-full'><Image src={`/assets/rooms/${data.img}`} alt='' fill className='object-cover object-top' /></div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div> */}
                <ImageGallery />
            </section>
        </main>
    )
}
