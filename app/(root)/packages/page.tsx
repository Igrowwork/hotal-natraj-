import { radley, robotoFlex } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Icons } from "../components/icons/icons";
import prismadb from "@/lib/prismadb";

const truncateDescription = (text: string, wordLimit: number) => {
  const words = text.split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
};

export default async function Page() {
  const packages = await prismadb.plan.findMany();

  return (
    <main>
      <section>
        <div className="h-[500px] sm:h-[600px] w-full relative flex justify-center items-center">
          <Image
            src={`/assets/images/package-img.png`}
            alt=""
            fill
            className="object-cover"
          />
          <div className="relative w-full  flex flex-col-reverse gap-4">
            <h1
              className={cn(
                "text-white text-6xl font-bold text-center relative z-50",
                radley.className
              )}
            >
              Packages
            </h1>
            <h2
              className={cn(
                "text-white text-2xl font-medium text-center relative z-50",
                radley.className
              )}
            >
              Know More
            </h2>
          </div>
          <div className="h-full w-full absolute top-0 left-0 bg-black/50" />
        </div>
        <div className="pt-8 pb-20 w-full h-full max-w-7xl mx-auto px-6 flex flex-col gap-12">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold">
            Package Details, Hotel Natraj
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {packages.map((e) => (
              <>
                <div className="grid w-full h-fit rounded-md overflow-hidden shadow-[0_4px_24px_0_rgba(0,57,123,0.25)]">
                  <div className="grid grid-cols-2 gap-0.5 h-60">
                    <div className="relative">
                      <Image
                        src={"/assets/images/package-img-1.png"}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative">
                      <Image
                        src={"/assets/images/package-img-2.png"}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 p-6">
                    <h2 className="text-xl sm:text-2xl font-semibold flex flex-col text-center">
                      {e.name}
                      {/* <span>(Continental Plan)</span> */}
                    </h2>
                    <ul className="flex flex-col gap-4">
                      <li className="text-lg sm:text-xl font-medium tracking-normal mx-w">
                        {truncateDescription(e.description ?? "",15)}
                      </li>
                      {e.features.map((e) => (
                        <>
                          <li className="pl-4 font-medium flex gap-2 items-center">
                            <Icons.tea /> {e}
                          </li>
                        </>
                      ))}
                    </ul>
                    <h3 className="text-2xl sm:text-3xl font-semibold mt-6">
                      <span className="font-light">₹</span> {e.price}
                      <span className="text-lg sm:text-xl font-normal">{`/per member`}</span>
                    </h3>
                  </div>
                </div>
              </>
            ))}

            {/* <div className='grid w-full h-fit rounded-md overflow-hidden shadow-[0_4px_24px_0_rgba(0,57,123,0.25)]'>
                            <div className='grid grid-cols-2 gap-0.5 h-60'>
                                <div className='relative'><Image src={'/assets/images/package-img-1.png'} alt='' fill className='object-cover' /></div>
                                <div className='relative'><Image src={'/assets/images/package-img-2.png'} alt='' fill className='object-cover' /></div>
                            </div>
                            <div className='flex flex-col gap-4 p-6'>
                                <h2 className='text-xl sm:text-2xl font-semibold flex flex-col text-center'>CP Plan<span>(Continental Plan)</span></h2>
                                <ul className='flex flex-col gap-4'>
                                    <li className='text-lg sm:text-xl font-medium'>It includes Room Rent -</li>
                                    <li className='pl-4 font-medium flex gap-2 items-center'><Icons.tea />  Early Morning Tea</li>
                                    <li className='pl-4 font-medium flex gap-2 items-center'><Icons.breakfast />  Breakfast</li>
                                </ul>
                                <h3 className='text-2xl sm:text-3xl font-semibold mt-6'><span className='font-light'>₹</span> {`200`}<span className='text-lg sm:text-xl font-normal'>{`/per member`}</span></h3>
                            </div>
                        </div>
                        <div className='grid w-full h-fit rounded-md overflow-hidden shadow-[0_4px_24px_0_rgba(0,57,123,0.25)]'>
                            <div className='grid grid-cols-2 gap-0.5 h-60'>
                                <div className='relative'><Image src={'/assets/images/package-img-1.png'} alt='' fill className='object-cover' /></div>
                                <div className='relative'><Image src={'/assets/images/package-img-2.png'} alt='' fill className='object-cover' /></div>
                            </div>
                            <div className='flex flex-col gap-4 p-6'>
                                <h2 className='text-xl sm:text-2xl font-semibold flex flex-col text-center'>MAP Plan<span>(Modified American Plan)</span></h2>
                                <ul className='flex flex-col gap-4'>
                                    <li className='text-lg sm:text-xl font-medium'>It includes Room Rent -</li>
                                    <li className='pl-4 font-medium flex gap-2 items-center'><Icons.tea />  Early Morning Tea</li>
                                    <li className='pl-4 font-medium flex gap-2 items-center'><Icons.breakfast />  Breakfast</li>
                                    <li className='pl-4 font-medium flex gap-2 items-center'><Icons.dish1 />  Choice Between Lunch/Dinner</li>
                                </ul>
                                <h3 className='text-2xl sm:text-3xl font-semibold mt-6'><span className='font-light'>₹</span> {`550`}<span className='text-lg sm:text-xl font-normal'>{`/per member`}</span></h3>
                            </div>
                        </div>
                        <div className='grid w-full h-fit rounded-md overflow-hidden shadow-[0_4px_24px_0_rgba(0,57,123,0.25)]'>
                            <div className='grid grid-cols-2 gap-0.5 h-60'>
                                <div className='relative'><Image src={'/assets/images/package-img-1.png'} alt='' fill className='object-cover' /></div>
                                <div className='relative'><Image src={'/assets/images/package-img-2.png'} alt='' fill className='object-cover' /></div>
                            </div>
                            <div className='flex flex-col gap-4 p-6'>
                                <h2 className='text-xl sm:text-2xl font-semibold flex flex-col text-center'>AP Plan<span>(American Plan)</span></h2>
                                <ul className='flex flex-col gap-4'>
                                    <li className='text-lg sm:text-xl font-medium'>It includes Room Rent -</li>
                                    <li className='pl-4 font-medium flex gap-2 items-center'><Icons.tea />  Early Morning Tea</li>
                                    <li className='pl-4 font-medium flex gap-2 items-center'><Icons.breakfast />  Breakfast</li>
                                    <li className='pl-4 font-medium flex gap-2 items-center'><Icons.dish1 />  Lunch</li>
                                    <li className='pl-4 font-medium flex gap-2 items-center'><Icons.dish2 />  Dinner</li>
                                </ul>
                                <h3 className='text-2xl sm:text-3xl font-semibold mt-6'><span className='font-light'>₹</span> {`700`}<span className='text-lg sm:text-xl font-normal'>{`/per member`}</span></h3>
                            </div>
                        </div> */}
          </div>
          {/* <div className='border-b'>
                        <p className='text-primary pb-2 border-b-2 border-primary w-fit -mb-[1px] pl-[6px] pr-2 text-lg font-medium'>Package Details</p>
                    </div>
                    <div className='flex flex-col gap-6'>
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
                    </div> */}
        </div>
      </section>
    </main>
  );
}
