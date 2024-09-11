import React from 'react'

export default function Page() {
    const notices = [
        'Check-in time is 02:00 PM and check-out time is 12:00 PM noon. Subject to availability, early check-in and late check-out will be considered.', 'Extra Person charges – Rs. 350 per person.', 'GST / Taxes charged extra and applicable as per government directives.', '100 % advance Payment deposit at the time of Check in.', 'We do not accept personal Cheques for payment.', 'It is Mandatory for all customers and their visitor guests to share their ID cards. Foreign Nationals are required to present their passport and valid visa.', 'Smoking, Alcohol, Gambling,contraband goods, drugs, etc – are all strictly prohibited within the hotel premises.', 'Non Vegetarian and / or Pungent food is not allowed in the hotel premises.', 'We do not allow visitors entry to guest room.', 'Tariff - subject to change without prior notice.', 'Amendment / changes of bookings is allowed until only 72 hours (3 days) prior to arrival. Request will be considered as per availability.', 'Children up-to 8 Years of age can stay free above 8 years will be charged as per extra adult rate.', 'The cancellation is free of charge 25 days prior to the date of arrival, after this time 90% of the room rate will be charged as cancellation fee.', 'We accept advance booking only upto 1 month with full tariff advance payment.', 'Personal food and beverages are not allowed.', 'THE MANAGEMENT RESERVES THE RIGHT TO ADD, OR ALTER OR AMEND ANY OF THE ABOVE policy, TERMS, CONDITIONS AND RULES at any point of time without prior notice.'
    ]
    return (
        <main className='min-h-screen bg-white px-4 pt-28 pb-10 sm:pb-20'>
            <div className='h-full w-full max-w-6xl mx-auto flex flex-col gap-8 shadow-[0_4px_15px_0_rgba(0,0,0,0.15)] p-4 sm:p-6 lg:p-8'>
                <h2 className='text-2xl sm:text-4xl font-medium'>Important Notice</h2>
                <ul className='flex flex-col gap-2 list-disc pl-6 sm:pl-8 lg:pl-12 font-medium'>
                    {notices.map((notice, index) => (
                        <li key={index}>
                            {notice}
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}
