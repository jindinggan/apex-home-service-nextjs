'use client'

import React, { useState } from 'react';

const ScrollableList = () => {
    const totalSlots = 7; // Total number of slots
    const [currentIndex, setCurrentIndex] = useState(0);

    const data = [
        {
            id: 1,
            imageSrc: '/images/image1.jpg', // Replace with the actual image URL
            name: 'Image 1',
        },
        {
            id: 2,
            imageSrc: '/images/image1.jpg', // Replace with the actual image URL
            name: 'Image 2',
        },
        {
            id: 3,
            imageSrc: '/images/image1.jpg', // Replace with the actual image URL
            name: 'Image 3',
        },
        {
            id: 4,
            imageSrc: '/images/image1.jpg', // Replace with the actual image URL
            name: 'Image 4',
        },
        {
            id: 5,
            imageSrc: '/images/image1.jpg', // Replace with the actual image URL
            name: 'Image 5',
        },
        {
            id: 6,
            imageSrc: '/images/image1.jpg', // Replace with the actual image URL
            name: 'Image 6',
        },
        {
            id: 7,
            imageSrc: '/images/image1.jpg', // Replace with the actual image URL
            name: 'Image 7',
        },
        {
            id: 8,
            imageSrc: '/images/image2.jpg', // Replace with the actual image URL
            name: 'Image 8',
        },
        {
            id: 9,
            imageSrc: '/images/image2.jpg', // Replace with the actual image URL
            name: 'Image 9',
        },
        {
            id: 10,
            imageSrc: '/images/image2.jpg', // Replace with the actual image URL
            name: 'Image 10',
        },
        {
            id: 11,
            imageSrc: '/images/image2.jpg', // Replace with the actual image URL
            name: 'Image 11',
        },
        {
            id: 12,
            imageSrc: '/images/image2.jpg', // Replace with the actual image URL
            name: 'Image 12',
        },
        {
            id: 13,
            imageSrc: '/images/image2.jpg', // Replace with the actual image URL
            name: 'Image 13',
        },
        {
            id: 14,
            imageSrc: '/images/image2.jpg', // Replace with the actual image URL
            name: 'Image 14',
        },
        // Add more data objects as needed
    ];

    const canScrollRight = currentIndex + totalSlots < data.length;
    const canScrollLeft = currentIndex > 0;

    const scrollRight = () => {
        if (canScrollRight) {
            setCurrentIndex(currentIndex + 1); // Move by 7 slots
        }
    };

    const scrollLeft = () => {
        if (canScrollLeft) {
            setCurrentIndex(currentIndex - 1); // Move by 7 slots
        }
    };

    return (
        <div className="relative overflow-x-hidden mx-16">
            <div
                className="flex space-x-4"
                style={{
                    transform: `translateX(-${currentIndex * (100 / (data.length - totalSlots + 1))}%)`,
                    transition: 'transform 0.5s ease', // Apply a smooth transition
                }}
            >
                {data.slice(currentIndex, currentIndex + totalSlots).map((item) => (
                    <div key={item.id} className="w-screen">
                        <div className="mb-2 rounded-lg overflow-hidden aspect-w-1 aspect-h-1">
                            <img
                                src={item.imageSrc}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="text-sm font-medium text-gray-900 text-center">{item.name}</p>
                    </div>
                ))}
            </div>
            <button
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 ${
                    !canScrollLeft ? 'hidden' : ''
                } bg-gray-100 px-2 py-1 rounded-full shadow-md`}
                onClick={scrollLeft}
            >
                &lt;
            </button>
            <button
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${
                    !canScrollRight ? 'hidden' : ''
                } bg-gray-100 px-2 py-1 rounded-full shadow-md`}
                onClick={scrollRight}
            >
                &gt;
            </button>
        </div>


    );
};

export default ScrollableList;
