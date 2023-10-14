import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/components/EmptyState";
import Container from "@/components/Container";
import HeartButton from "@/components/HeartButton";
import getCurrentUser from "@/app/actions/getCurrentUser";
import {LocationValue} from "@/interfaces/list.locationValue.model";
import Map from "@/components/Map";
import Image from "next/image";


interface IParams {
    slug?: string;
}

const ItemDetailPage = async ({params}: { params: {slug: string}}) =>  {
    const item = await getListingById(params.slug);
    const currentUser = await getCurrentUser();

    if(!item) {
        return (
            <EmptyState/>
        )
    }

    return(
        <section className="text-gray-700 body-font overflow-hidden bg-white">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={item.imageSrc}/>
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">{item.brand}</h2>
                            <h1 className="text-gray-900 text-4xl title-font font-medium mb-1">{item.name}</h1>
                            <div className="flex mb-4">

                            </div>
                            <p className="leading-relaxed"><strong>Appearance Condition:</strong> {item.appearanceCondition}</p>
                            <p className="leading-relaxed"><strong>Functional Condition:</strong> {item.functionalCondition}</p>
                            <p className="leading-relaxed">Located in <strong>{(item.locationValue as unknown as LocationValue)?.label}</strong></p>

                            <h2 className="text-gray-900 text-2xl title-font font-medium mb-1 pt-3">Description</h2>
                            <p>{item.description}</p>


                            <div className="flex pt-3">
                                <span className="title-font font-medium text-2xl text-gray-900">${item.price}</span>
                                <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Make Offer</button>
                                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                </div>
                <div className="px-5 py-24">
                    <Map center={(item.locationValue as unknown as LocationValue)?.latlng}/>
                </div>
            </div>
        </section>


    );

}

export default ItemDetailPage;