'use client'

import { MdChevronLeft, MdChevronRight} from "react-icons/md";
import {serviceCategories} from "@/components/navbar/Categories";
import {useRouter} from "next/navigation";
import Image from "next/image";

const BrowseProfessionals = () => {
    const router = useRouter();
    const data = serviceCategories;

    // const data = [
    //     {
    //         id: 1,
    //         imageSrc: '/images/BuildingDesigners.jpg', // Replace with the actual image URL
    //         name: 'Building Designers',
    //     },
    //     {
    //         id: 2,
    //         imageSrc: '/images/Design-Build Firms.jpg', // Replace with the actual image URL
    //         name: 'Design-Build Firms',
    //     },
    //     {
    //         id: 3,
    //         imageSrc: '/images/General Contractors.jpg', // Replace with the actual image URL
    //         name: 'General Contractors',
    //     },
    //     {
    //         id: 4,
    //         imageSrc: '/images/Home Builders.jpg', // Replace with the actual image URL
    //         name: 'Home Builders',
    //     },
    //     {
    //         id: 5,
    //         imageSrc: '/images/livingroom.jpg', // Replace with the actual image URL
    //         name: 'Living Room',
    //     },
    //     {
    //         id: 6,
    //         imageSrc: '/images/image1.jpg', // Replace with the actual image URL
    //         name: 'Image 6',
    //     },
    //     {
    //         id: 7,
    //         imageSrc: '/images/image1.jpg', // Replace with the actual image URL
    //         name: 'Image 7',
    //     },
    //     {
    //         id: 8,
    //         imageSrc: '/images/image2.jpg', // Replace with the actual image URL
    //         name: 'Image 8',
    //     },
    //     {
    //         id: 9,
    //         imageSrc: '/images/image2.jpg', // Replace with the actual image URL
    //         name: 'Image 9',
    //     },
    //     {
    //         id: 10,
    //         imageSrc: '/images/image2.jpg', // Replace with the actual image URL
    //         name: 'Image 10',
    //     },
    //     {
    //         id: 11,
    //         imageSrc: '/images/image2.jpg', // Replace with the actual image URL
    //         name: 'Image 11',
    //     },
    //     {
    //         id: 12,
    //         imageSrc: '/images/image2.jpg', // Replace with the actual image URL
    //         name: 'Image 12',
    //     },
    //     {
    //         id: 13,
    //         imageSrc: '/images/image2.jpg', // Replace with the actual image URL
    //         name: 'Image 13',
    //     },
    //     {
    //         id: 14,
    //         imageSrc: '/images/image2.jpg', // Replace with the actual image URL
    //         name: 'Image 14',
    //     },
    //     // Add more data objects as needed
    // ];

    const slideLeft = () => {
        var slider = document.getElementById('browse_professionals_slider')
        // @ts-ignore
        slider.scrollLeft = slider.scrollLeft - 500

    }
    const slideRight = () => {
        var slider = document.getElementById('browse_professionals_slider')
        // @ts-ignore
        slider.scrollLeft = slider.scrollLeft + 500

    }
    return(
        <>
            <div className="flex justify-between items-center mx-24">
                <div className="align-bottom top-0 bg-white px-2 pt-14 text-2xl">Browse Professionals Near You</div>
                <button className="text-indigo-600 pt-14 hover:underline focus:outline-none" onClick={() => {router.push("/professionalServices/All")}}>
                    See All
                </button>
            </div>
            <div className="relative flex items-center mx-16 mt-4">
                <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={slideLeft} size={40}/>
                <div id='browse_professionals_slider' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                    {data.map((item) => (
                        <div key={item.label} className="inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300" onClick={() => router.push(`/professionalServices/${item.label}`)}>
                            <img className="w-[220px] h-[170px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                                 src={item.imgSrc}
                                 alt={'/'}
                            />
                            <p className="text-center text-lg text-gray-900 font-semibold">{item.label}</p>
                        </div>
                    ))}
                </div>
                <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={slideRight} size={40}/>
            </div>
        </>


    );
}

export default BrowseProfessionals;