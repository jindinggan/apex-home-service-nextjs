import getCurrentUser from "@/app/actions/getCurrentUser";
import getServices from "@/app/actions/getServices";
import getServiceById from "@/app/actions/getServiceById";
import EmptyState from "@/components/EmptyState";

import React, {useCallback} from "react";
import getUserByServiceId from "@/app/actions/getUserByServiceId";
import useLoginModal from "@/hooks/useLoginModal";
import useMessageModal from "@/hooks/useMessageModal";
import SendMessageButton from "@/components/buttons/SendMessageButton";

interface IParams {
    slug?: string;
}

const serviceDetailPage = async ({params}: { params: {slug: string}}) => {

    const service = await getServiceById(params.slug);
    const user = await getUserByServiceId(params.slug);
    const currentUser = await getCurrentUser();
    const reviews = [
        {
            username: 'Dinggan Jin',
            rating: 5,
            comment: 'Great service! Highly recommend it.',
            date: '2023-09-27'
        },
        {
            username: 'Simon Jin',
            rating: 4,
            comment: 'Good value for the price.',
            date: '2023-09-26'
        }
    ];

    if(!service) {
        return (
            <EmptyState/>
        )
    }



    return (
        <div>
            {/*<div className="py-6">*/}
            {/*    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">*/}
            {/*        <div className="flex items-center space-x-2 text-gray-400 text-sm">*/}
            {/*            <a href="#" className="hover:underline hover:text-gray-600">Home</a>*/}
            {/*            <span>*/}
            {/*<svg className="h-5 w-5 leading-none text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
            {/*   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />*/}
            {/*</svg>*/}
            {/* </span>*/}
            {/*                <a href="#" className="hover:underline hover:text-gray-600">Electronics</a>*/}
            {/*                <span>*/}
            {/*    <svg className="h-5 w-5 leading-none text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
            {/*       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />*/}
            {/*    </svg>*/}
            {/* </span>*/}
            {/*            <span>Headphones</span>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="flex flex-col md:flex-row -mx-4">

                    <div className="h-64 md:h-80 rounded-lg mb-4 md:flex-1 px-4 aspect-w-12 aspect-h-12 relative">

                        <img
                            src={`${service.imageSrc}`}
                            alt="tailwind logo"
                            className="absolute top-0 left-0 w-full h-full rounded-xl object-cover"
                        />

                    </div>

                    <div className="md:flex-1 px-4">
                        <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{service.name}</h2>
                        <p className="text-gray-500 text-sm">By <a href="#" className="text-indigo-600 hover:underline">{user?.name}</a></p>

                        <div className="flex items-center space-x-4 my-4">
                            <div>
                                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                                    <span className="text-indigo-400 mr-1 mt-1">$</span>
                                    <span className="font-bold text-indigo-600 text-3xl">{service.priceRangeLowBound} - {service.priceRangeHighBound}</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-400 text-sm">Price range for a typical project</p>
                            </div>
                        </div>

                        <p className="text-gray-500">{service.serviceDescription}</p>
                        <div className="flex py-4 space-x-4 justify-end">
                            <div className="relative">

                                <SendMessageButton currentUser={currentUser}/>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>

                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                    {reviews.map((review, index) => (
                        <div key={index} className="border-b pb-4 mb-4">
                            <div className="flex justify-between">
                                <span className="font-bold">{review.username}</span>
                                <span>{Array(review.rating).fill('⭐').join('')}</span>
                            </div>
                            <p className="mt-2">{review.comment}</p>
                            <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}


export default serviceDetailPage;