import React from 'react'

export default function Page() {
    const notices = [
        'Accommodation will only be provided to guestswhose details are registered with hotel reception.',
        'Guests will be provided with a room key only upon arrival and after completing the registration at the hotel’s reception desk.',
        'Due to the fact that the hotel is located in a residential area it is required that guests, particularly those in groups are respective in regards to noise during the evenings.',
        'Please note that the check -in and key - collection take place at the hotel Reception only.',
        'Guests are required to show a photo identification upon check -in.Please note that all Special Requests are subject to availability and additional charges may apply.',
        'It is forbidden to bring into the hotel flammable materials, explosives or firearms.Bringing or storing any products / items of combustible or hazardous nature and / or prohibited goods and / or goods of objectionable nature is strictly prohibited.',
        'Subject to availability of the storage space, the guest customer can store luggage in the luggage room, at the their own sole risk as to loss or damage from any cause, Luggage may not be stored for a period of over 24 hrs.',
        'Gambling, Smoking, contraband / smuggled goods, weapons, explosives, flammable objects, poisons, drugs, animals, Non Veg and / or pungent food - are all strictly prohibited in the hotel premises.',
        'For any Damage done to the hotel amenities, articles, furniture, property., etc., by or due to guests themselves or their visitor or any other person for whom they are responsible, guests will be held responsible and so must make up to pay and settle for such loss and damage in full as deemed appropriate by the management.',
        'Visitors entry to the guests’ rooms strictly prohibited, however in case of exceptional circumstances the management may allow visitor to guest room only after having photo Identity proof documents and register entry at reception.Also customer’s signed approval and mandatory registration at the reception desk(leaving an identity card and personal details).',
        'The hotel may deny further accommodation to a guest who does not prove to be decent and comply with the hotel policy and rules.',
        'It is not allowed to cause any disturbance to other guests nor cause any nuisance or annoyance in the hotel premises.It is agreeably anticipated that guest will conduct themselves in a respectable, civilized and decent manner.',
        'For Any Damage done to the hotel amenities, items or property, guests are liable to make up for the charges in full, and for the amount as seen appropriate by the management.',
        "The Management will not in any way whatsoever be responsible for any loss / or damage to the Guest's belongings for any cause whatsoever.",
        "The Guest shall be solely liable and responsible to the management, its other customers guests, invitees visitors, agents and servants for all loss financial or otherwise and damage that may be caused as a result of the guests' own negligence and non-observance of any hotel rules policy or instructions.",
        "Using photographs and video's taken in the hotel for commercial or public purposes is illegal. Those who do so will be subject to prosecution.",
        "The Management has the right to request any guest to vacate his / her room or other areas of the hotel forthwith, Without previous notice and without assigning any reason whatsoever, and the guest shall be bound to vacate when requested to do so.In case of the default, the Management has the right to remove the Guest luggage and belongings from the room occupied by him / her.",
        "Guest are requested to observe, abide by confirming to and be bound by all applicable acts and laws and Government rules and regulations in force from time to time.",
        "THE MANAGEMENT RESERVES THE RIGHT TO ADD, OR ALTER OR AMEND ANY OF THE ABOVE policy, TERMS, CONDITIONS AND RULES at any point of time without prior notice",
    ]
    return (
        <main className='min-h-screen bg-white px-4 pt-28 pb-10 sm:pb-20'>
            <div className='h-full w-full max-w-6xl mx-auto flex flex-col gap-8 shadow-[0_4px_15px_0_rgba(0,0,0,0.15)] p-4 sm:p-6 lg:p-8'>
                <h2 className='text-2xl sm:text-4xl font-medium'>Hotel Policy & House Rules</h2>
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
