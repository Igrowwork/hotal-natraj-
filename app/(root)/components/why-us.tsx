import { robotoFlex } from '@/app/fonts'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

// Reusable ContentBlock Component
const ContentBlock: React.FC<{ iconSrc: string, title: string, description: string }> = ({ iconSrc, title, description }) => (
  <div className='flex flex-col gap-2'>
    <div className='h-14 w-14 bg-blue-400 bg-opacity-30 rounded-md relative'>
      <Image src={iconSrc} alt={title} fill className='h-4 w-4 p-3' />
    </div>
    <h3 className='text-2xl font-bold'>{title}</h3>
    <p className='text-lg'>{description}</p>
  </div>
);

const WhyChooseUs: React.FC = () => {
  const contentBlocks = [
    {
      iconSrc: '/assets/svg/medal-star.svg',
      title: 'We provide best choice for you',
      description: `We always prioritize our customer comfort and satisfaction. That's why we only accept the best hotel and destination.`,
    },
    {
      iconSrc: '/assets/svg/dollar.svg',
      title: 'Low price with best quality',
      description: `Although the price tends to be cheaper but it will not affect the quality of service.`,
    },
    {
      iconSrc: '/assets/svg/truck-tick.svg',
      title: 'Refund and Reschedule',
      description: `Don't worry if suddenly you have problem and want to reschedule or refund, you can get fully.`,
    },
  ];

  return (
    <section>
      <h2 className={cn('text-4xl lg:text-5xl text-primary font-bold text-center', robotoFlex.className)}>
        Why Choose Us
      </h2>
      <p className='text-lg px-5 lg:text-2xl lg:font-medium text-center mt-3'>
        We are located in a prime location, close to all of the attractions and amenities that our guests want.
      </p>
      <div className='flex flex-col lg:flex-row gap-20 lg:gap-20 h-full w-full max-w-6xl mx-auto my-10 px-[5%] lg:px-10 xl:px-0'>
        <div className='lg:w-1/2 flex flex-col gap-10 order-2 relative px-[5%] sm:px-[10%] lg:px-0'>
          {contentBlocks.map(({ iconSrc, title, description }, index) => (
            <ContentBlock
              key={index}
              iconSrc={iconSrc}
              title={title}
              description={description}
            />
          ))}
        </div>

        <div className='relative lg:w-1/2 h-full px-[5%] sm:px-[10%] lg:px-0 lg:order-2'>
          <div className='relative h-[400px] sm:h-[500px] lg:h-[550px] w-full my-auto'>
            <Image src='/assets/images/adventure.jpg' alt='Adventure Image' fill className='object-cover rounded-xl' />
          </div>
          <div className='bg-white shadow-2xl p-2 absolute top-5 -left-2 sm:left-0 lg:-left-16 w-fit flex flex-col gap-[2px] sm:gap-2 items-center rounded-lg'>
            <div className='h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-red-400'></div>
            <p className='text-xs sm:text-sm font-semibold'>Gautam Singh</p>
            <div className='flex gap-5'>
              <span className='flex gap-1 items-center text-[8px] sm:text-xs'>
                <Star className='h-2 w-2 text-yellow-400 fill-yellow-400' /> 5.0
              </span>
              <span className='text-[8px] sm:text-xs'>{`(6.3k reviews)`}</span>
            </div>
          </div>
          {/* Uncomment if needed */}
          {/* <div className='bg-white p-3 w-fit absolute top-[90%] left-[55%] sm:left-[65%] lg:left-[55%] xl:left-[66%] rounded-lg shadow-2xl flex flex-col gap-2 items-center'>
            <h3 className='text-[10px] sm:text-sm xl:text-base font-bold'>{`How your Experience?`}</h3>
            <div className='text-xl sm:text-3xl xl:text-4xl flex gap-3'>
              <span>😃</span>
              <span>😐</span>
              <span>☹️</span>
              <span>😡</span>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
