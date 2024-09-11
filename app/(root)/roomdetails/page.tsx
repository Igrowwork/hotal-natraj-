import { Car, CheckCircle, Clock, Dog, PhoneCall, Shirt, Wifi, XCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { differenceInDays, parse, format } from 'date-fns';
import PaymentCard from './components/payment-detail-card'
import { fetchRooms, getAnonymous } from '@/functions/fetchrooms'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Icons } from '../components/icons/icons';
import { fetchCategory } from '@/functions/fetchcategory';

const iconClass = 'h-8 w-8'

const facilities = [
    {
        icon: <Icons.aboutIcon1 className={iconClass} />,
        text: "24*7 Room Service"
    },
    {
        icon: <Icons.aboutIcon2 className={iconClass} />,
        text: "Free WiFi"
    },
    {
        icon: <Icons.aboutIcon3 className={iconClass} />,
        text: "Doctor on Call"
    },
    {
        icon: <Icons.aboutIcon4 className={iconClass} />,
        text: "Pick up and Drop"
    },
    {
        icon: <Icons.aboutIcon5 className={iconClass} />,
        text: "Pet Friendly"
    },
    {
        icon: <Icons.aboutIcon6 className={iconClass} />,
        text: "Laundry"
    },
]

export default async function Page({ searchParams }: { searchParams: { id: string, startDate: string, endDate: string } }) {
    const session = await getServerSession(options)
    const id = await getAnonymous();
    if (!searchParams.startDate || !searchParams.endDate || !searchParams.id) {
        redirect('/')
    }
    const category = await fetchCategory(searchParams.id)
    const fetchroomforcategoy = await fetchRooms({ categoryId: searchParams.id, startDate: searchParams.startDate, endDate: searchParams.endDate })
    const selectedPlan = await prismadb.plan.findMany()


    //@ts-ignore
    const userId = !session ? id : session.user.id

    // Parse the date strings into Date objects
    const checkinDate = parse(searchParams.startDate, 'yyyy-MM-dd', new Date());
    const checkoutDate = parse(searchParams.endDate, 'yyyy-MM-dd', new Date());

    // Calculate the difference in days
    const numberOfDays = differenceInDays(checkoutDate, checkinDate) + 1;

    // Calculate the number of nights (assuming nights are consecutive days)
    const numberOfNights = numberOfDays - 1;

    return (
        <>
            <div className='h-[600px] w-full relative flex justify-center items-center'>
                <Image src={`/assets/rooms/${category?.images[0]}`} alt='' fill className='object-cover' />
            </div>
            <div className='px-6 lg:px-0 relative -top-20 z-50'>
                <div className='w-full max-w-6xl mx-auto bg-white py-6 sm:py-10 flex flex-col gap-10 px-6 shadow-[0_4px_16px_0_rgba(0,57,123,0.25)]'>
                    <div className='flex flex-col gap-10'>
                        <h3 className='text-2xl sm:text-3xl lg:text-4xl font-semibold'>{`${category?.name}, Hotel Natraj`}</h3>
                        <div className='flex gap-10 sm:gap-40'>
                            <div className='flex gap-4 sm:gap-6 lg:gap-8 py-5'>
                                <div className='flex flex-col gap-2'>
                                    <span className='text-xs sm:text-sm text-gray-500'>Check-in Date</span>
                                    <span className='text-sm sm:text-base lg:text-xl font-medium'>{format(checkinDate, "PPP")}</span>
                                </div>
                                <div className='flex flex-col gap-2 px-8 border-x border-dashed border-gray-500'>
                                    <span className='text-xs sm:text-sm text-gray-500'>Check-in Date</span>
                                    <span className='text-sm sm:text-base lg:text-xl font-medium'>{format(checkoutDate, "PPP")}</span>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <span className='text-xs sm:text-sm text-gray-500'>Check-in Date</span>
                                    <span className='text-sm sm:text-base lg:text-xl font-medium'>{numberOfDays} Days/ {numberOfNights} Nights</span>
                                </div>
                                {/* <div className='flex flex-col gap-2 pr-5 sm:pr-10 border-r'>
                                    <span className='text-xs text-gray-500'>Days</span>
                                    <span className='text-sm sm:text-base'>{numberOfDays} Days/ {numberOfNights} Nights</span>
                                </div> */}
                            </div>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <h3 className='text-lg sm:text-xl lg:text-2xl font-semibold uppercase'>FEATURED AMENITIES ON-SITE</h3>
                            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 w-full gap-6 sm:gap-8'>
                                {facilities.map((fac, index) => (
                                    <div key={index} className='flex flex-col gap-2 items-center'>
                                        {/* <div className='relative h-7 lg:h-10 w-full'>
                                        <Image src={`/assets/images/${fac.icon}`} alt='' fill className='object-contain' />
                                    </div> */}
                                        {fac.icon}
                                        <p className='text-xs sm:text-sm lg:text-base font-medium text-[#636363]'>{fac.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h3 className='text-lg sm:text-xl lg:text-2xl font-semibold uppercase'>hotels information</h3>
                            <div className='flex flex-col sm:flex-row gap-3 sm:gap-20 text-[#636363]'>
                                <p className='flex gap-2 text-sm sm:text-base lg:text-xl items-center'><Clock /> <span>{`Check in - 12:00 pm`}</span></p>
                                <p className='flex gap-2 text-sm sm:text-base lg:text-xl items-center'><Clock /> <span>{`Check out - 11:00 am`}</span></p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h3 className='text-lg sm:text-xl lg:text-2xl font-semibold uppercase'>Restaurant Seth Saawariya ji</h3>
                            <div className='flex flex-col gap-2 text-[#636363]'>
                                <p className='text-sm sm:text-base lg:text-xl font-medium'>The multi cuisine pure veg restaurant</p>
                                <span className='flex gap-2 text-sm sm:text-base lg:text-xl'><Clock /> {`Opens at 7:30 am to 11:30 PM`}</span>
                            </div>
                        </div>
                        <div className='py-6 flex flex-col gap-4'>
                            <h3 className='text-2xl font-semibold uppercase'>Personal Details</h3>
                            {
                                fetchroomforcategoy.rooms.length <= 0 ? <div>no rooms are available in this category</div> :
                                    <PaymentCard checkin={searchParams.startDate} checkout={searchParams.endDate} rooms={fetchroomforcategoy.rooms} userId={userId} selectedPlan={selectedPlan} totalNight={numberOfNights} />
                            }
                            {/* <BookingDetailsForm /> */}
                        </div>
                    </div>

                    {/* <Tabs defaultValue="overview" className="w-full rounded-none">
                        <TabsList className='flex gap-10 justify-start bg-transparent rounded-none border-b'>
                            <TabsTrigger value="overview" className='rounded-none -ml-1'>Overview</TabsTrigger>
                            <TabsTrigger value="plans" className='rounded-none'>Plan Details</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className='flex flex-col gap-8 pt-6'>
                            <div className='flex flex-col gap-5'>
                                <h3 className='text-xl sm:text-2xl font-semibold uppercase'>{`features amenities on-site`}</h3>
                                <ul className='grid grid-cols-2 sm:grid-cols-3 gap-5'>
                                    <li className='flex gap-2 sm:text-lg'><CheckCircle /> <span>{`24*7 Room Service`}</span></li>
                                    <li className='flex gap-2 sm:text-lg'><Wifi /> <span>{`Free Wifi`}</span></li>
                                    <li className='flex gap-2 sm:text-lg'><Car /> <span>{`Pick-up and Drop`}</span></li>
                                    <li className='flex gap-2 sm:text-lg'><PhoneCall /> <span>{`Doctor on a Call`}</span></li>
                                    <li className='flex gap-2 sm:text-lg'><Dog /> <span>{`Pet Friendly`}</span></li>
                                    <li className='flex gap-2 sm:text-lg'><Shirt /> <span>{`Laundry`}</span></li>
                                </ul>
                            </div>
                            <div className='flex flex-col gap-5'>
                                <h3 className='text-2xl font-semibold uppercase'>hotels information</h3>
                                <div className='flex flex-col sm:flex-row gap-3 sm:gap-20'>
                                    <p className='flex gap-2 text-xl items-center'><Clock /> <span>{`Check in - 12:00 pm`}</span></p>
                                    <p className='flex gap-2 text-xl items-center'><Clock /> <span>{`Check out - 11:00 am`}</span></p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-5'>
                                <h3 className='text-2xl font-semibold uppercase'>Restaurant Seth Saawariya ji</h3>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-lg font-medium'>The multi cuisine pure veg restaurant</p>
                                    <span className='flex gap-2 text-lg'><Clock /> {`Opens at 7:30 am to 11:30 PM`}</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-5'>
                                <h3 className='text-2xl font-semibold uppercase'>included/excluded</h3>
                                <div className='grid gap-10 sm:gap-0 sm:grid-cols-2'>
                                    <ul className='flex flex-col gap-4'>
                                        <li className='flex gap-2'><CheckCircle className='text-green-600' /> <span>{`Cab Transportation`}</span></li>
                                        <li className='flex gap-2'><CheckCircle className='text-green-600' /> <span>{`Breakfast, Lunch & Dinner`}</span></li>
                                        <li className='flex gap-2'><CheckCircle className='text-green-600' /> <span>{`Hotel Accommodation`}</span></li>
                                        <li className='flex gap-2'><CheckCircle className='text-green-600' /> <span>{`Professional Tour Guide`}</span></li>
                                    </ul>
                                    <ul className='flex flex-col gap-4'>
                                        <li className='flex gap-2'><XCircle className='text-red-600' /> <span>{`Sight-seen`}</span></li>
                                        <li className='flex gap-2'><XCircle className='text-red-600' /> <span>{`City Touur`}</span></li>
                                        <li className='flex gap-2'><XCircle className='text-red-600' /> <span>{`Custom Duty`}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="plans" className='flex flex-col gap-8'>
                            <div className='flex flex-col gap-2 -mt-2'>
                                <h2 className='text-xl sm:text-2xl font-semibold'>{`CP Plan (continental Plan)`}</h2>
                                <h3 className='text-2xl sm:text-3xl font-semibold'><span className='font-light'>₹</span> {`200`}<span className='text-lg sm:text-xl font-normal'>{`/per member`}</span></h3>
                                <ul className='flex flex-col gap-1'>
                                    <li className='text-lg sm:text-xl font-medium'>It includes -</li>
                                    <li className='pl-4 font-medium'>+  Early Morning Tea</li>
                                    <li className='pl-4 font-medium'>+  Breakfast</li>
                                </ul>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-xl sm:text-2xl font-semibold'>{`MAP Plan (Modified American Plan)`}</h2>
                                <h3 className='text-2xl sm:text-3xl font-semibold'><span className='font-light'>₹</span> {`550`}<span className='text-lg sm:text-xl font-normal'>{`/per member`}</span></h3>
                                <ul>
                                    <li className='text-lg sm:text-xl font-medium'>It includes -</li>
                                    <li className='pl-4 font-medium'>+  Early Morning Tea</li>
                                    <li className='pl-4 font-medium'>+  Breakfast</li>
                                    <li className='pl-4 font-medium'>+  Choice Between Lunch / Dinner</li>
                                </ul>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-xl sm:text-2xl font-semibold'>{`AP Plan (American Plan)`}</h2>
                                <h3 className='text-2xl sm:text-3xl font-semibold'><span className='font-light'>₹</span> {`700`}<span className='text-lg sm:text-xl font-normal'>{`/per member`}</span></h3>
                                <ul>
                                    <li className='text-lg sm:text-xl font-medium'>It includes Room Rent</li>
                                    <li className='pl-4 font-medium'>+  Early Morning Tea</li>
                                    <li className='pl-4 font-medium'>+  Breakfast</li>
                                    <li className='pl-4 font-medium'>+   Lunch</li>
                                    <li className='pl-4 font-medium'>+  Dinner</li>
                                </ul>
                            </div>
                        </TabsContent>
                    </Tabs> */}

                    {/* <div className='sm:w-2/3 lg:w-[30%]'>
                        <div className='w-full mx-auto flex flex-col gap-10 px-[10%] py-5 rounded-3xl relative lg:-top-[15%] bg-white' style={{ boxShadow: "0px 65.54166px 107.25px 0px rgba(0, 0, 0, 0.03), 0px 65.54166px 83.41667px 0px rgba(0, 0, 0, 0.03)" }}>
                            <p className='text-[42px] font-light'>₹ <span className='text-5xl font-semibold'>{fetchroomforcategoy.rooms[0].price}</span><span className='text-xl font-normal'>/per night</span></p>
                            <PaymentCard checkin={searchParams.startDate} checkout={searchParams.endDate} rooms={fetchroomforcategoy.rooms} userId={userId} useremail={String(useremail)} username={String(username)} userphone={userphone} selectedPlan={selectedPlan} totalNight={numberOfNights} />
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}
