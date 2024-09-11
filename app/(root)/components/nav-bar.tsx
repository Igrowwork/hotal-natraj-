"use client"

import { usePathname, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { User2 } from 'lucide-react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'
import Image from 'next/image'

const NavBar = () => {
    const { data: session } = useSession()
    const path = usePathname()
    const searchParams = useSearchParams()
    const search = searchParams.toString()
    const startDate = new Date();
    const endDate = new Date();

    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');

    const navList = [
        {
            label: 'Home',
            href: '/',
            active: path === '/'
        },
        {
            label: 'About Us',
            href: '/aboutus',
            active: path === '/aboutus'
        },
        {
            label: 'Rooms',
            href: `/rooms?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
            active: path === '/rooms'
        },
        {
            label: 'Packages',
            href: '/packages',
            active: path === '/packages'
        },
        {
            label: 'Dining',
            href: '/dining',
            active: path === '/dining'
        },
        {
            label: 'Gallery',
            href: '/gallery',
            active: path === '/gallery'
        },
        {
            label: 'Contact Us',
            href: '/contactus',
            active: path === '/contactus'
        },
    ]
    return (

        <nav className="border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 px-[5%] md:px-0 xl:px-[5%] absolute top-0 left-0 z-50 w-full">
            <div className="max-w-[1350px] w-full flex items-center justify-between mx-auto px-4 gap-10 lg:gap-0">
                <Link href={"/"} className="flex items-center h-20 relative w-1/2 sm:w-[20%] lg:w-[15%] xl:w-[12%]">
                    <Image src={"/assets/images/natraj-logo.png"} alt="" fill className=" object-contain" />
                    {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Hotel Natraj</span> */}
                </Link>
                <div className="hidden w-full lg:block md:w-auto">
                    <ul className="flex font-medium mt-4 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
                        {navList.map((data, index) => (<Link key={index} href={data.href} className={cn("block py-2 pl-3 lg:text-base xl:text-lg font-medium pr-4 text-black md:bg-transparent md:p-0 hover:text-primary hover:border-b-2 border-primary hover:scale-105 transition-all duration-100 ease-linear w-fit", data.active ? 'pb-1 text-primary border-b-2 border-primary scale-105' : '')} aria-current="page">{data.label}</Link>))}
                    </ul>
                </div>
                <div className='flex gap-5 lg:gap-10 items-center justify-end xl:justify-around'>
                    <div className='lg:flex items-center md:gap-2 lg:gap-5 hidden'>
                        {
                            session ? <Popover>
                                <PopoverTrigger className='p-2 bg-gray-200  rounded-full'><User2 className='w-7 h-7' /></PopoverTrigger>
                                <PopoverContent className='w-fit flex flex-col gap-3'>
                                    <Link href={'/your-bookings'}>
                                        Your Rooms
                                    </Link>
                                    <Separator />
                                    <div onClick={() => signOut({ callbackUrl: `/login?callbackUrl=${path}?${search}` })} className='bg-white w-24 border-primary border text-primary px-4 py-[6px] rounded-lg hover:bg-primary hover:text-white select-none cursor-pointer'>
                                        Sign out
                                    </div>
                                </PopoverContent>
                            </Popover>
                                :
                                <Link href={'/login'} className='bg-primary border-primary border text-white px-4 py-[6px] rounded-lg hover:bg-primary hover:text-white select-none cursor-pointer'>
                                    Log in
                                </Link>
                        }
                    </div>
                    <Sheet>
                        <SheetTrigger>
                            <div data-collapse-toggle="navbar-solid-bg" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100" aria-controls="navbar-solid-bg" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </div>
                        </SheetTrigger>
                        <SheetContent side={'left'} className='rounded-tr-2xl rounded-br-2xl'>
                            <SheetHeader>
                                <SheetTitle></SheetTitle>
                            </SheetHeader>
                            <SheetFooter className='pt-6'>
                                <SheetClose asChild>
                                    <ul className="flex flex-col font-medium mt-4 gap-5">
                                        {navList.map((data, index) => (<Link key={index} href={data.href} className={cn("block py-2 pl-3 md:text-sm lg:text-lg font-semibold pr-4 text-black md:bg-transparent md:p-0 hover:text-primary hover:border-b-2 border-primary hover:scale-105 transition-all duration-100 ease-linear w-fit", data.active ? 'pb-1 text-primary border-b-2 border-primary scale-105' : '')} aria-current="page">{data.label}</Link>))}
                                    </ul>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav >

    )
}

export default NavBar
