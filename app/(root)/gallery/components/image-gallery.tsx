"use client"

import { ChevronLeft, ChevronRight, Eye, SearchX, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Icons } from '../../components/icons/icons';

const imgName = [
    'room (4).jpeg',
    'room (5).jpeg',
    'room (6).jpeg',
    'room (7).jpeg',
    'room (8).jpeg',
    'room (9).jpeg',
    'room (10).jpeg',
    'room (11).jpeg',
    'room (12).jpeg',
    'room (13).jpeg',
    'room (14).jpeg',
    'room (15).jpeg',
    'room (16).jpeg',
    'room (1).jpeg',
    'room (2).jpeg',
    'room (3).jpeg',
]

const ImageGallery = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const openImagePopup = (index: any) => {
        setSelectedImageIndex(index);
    };

    const closeImagePopup = () => {
        setSelectedImageIndex(null);
    };

    const navigateImages = (direction: any) => {
        setSelectedImageIndex((prevIndex: any) => {
            const newIndex =
                direction === 'prev'
                    ? (prevIndex - 1 + imgName.length) % imgName.length
                    : (prevIndex + 1) % imgName.length;
            return newIndex;
        });
    };

    useEffect(() => {
        return () => {
            setSelectedImageIndex(null);
        };
    }, []);

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto px-6 pt-10 pb-20">
            {imgName.map((path, index) => (
                <div key={index} className="cursor-pointer relative row-span-12 p-4 group overflow-hidden" onClick={() => openImagePopup(index)}>
                    <Image src={`/assets/rooms/${path}`} alt={`Image ${index}`} className="object-cover" fill />
                    <div className='bg-primary/60 h-full w-full relative flex justify-center items-center scale-0 group-hover:scale-100 transition-all duration-500 ease-in-out'>
                        <Eye className='text-white h-6 w-6 sm:h-8 sm:w-8' />
                    </div>
                </div>
            ))}

            {selectedImageIndex !== null && (
                <div onClick={closeImagePopup} className="fixed z-40 top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm">
                    <div className="relative h-full w-full">
                        <button className="absolute top-2 right-2 text-primary" onClick={closeImagePopup}>
                            <X className='sm:h-8 sm:w-8 h-6 w-6' />
                        </button>
                        <button
                            className="absolute top-1/2 left-1/4 text-primary -ml-4 -mt-12"
                            onClick={() => navigateImages('prev')}
                        >
                            <Icons.chevronLeft />
                        </button>
                        <button
                            className="absolute top-1/2 right-1/4 text-primary -mr-4 -mt-12"
                            onClick={() => navigateImages('next')}
                        >
                            <Icons.chevronRight />
                        </button>
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-11/12 min-w-[260px] max-w-2xl z-50'>
                            <Image
                                src={`/assets/rooms/${imgName[selectedImageIndex]}`}
                                alt={`Image ${selectedImageIndex}`}
                                className="object-cover"
                                fill
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
