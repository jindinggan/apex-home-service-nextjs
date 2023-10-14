
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import EmptyState from "@/components/EmptyState";
import { useRouter } from "next/router";

import {stuffCategories} from "@/components/navbar/Categories";
import getListings from "@/app/actions/getListings";
import Container from "@/components/Container";
import ItemListingCard from "@/components/listings/ItemListingCard";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Filter from "@/components/filter/Filter";



interface IParams {
    slug?: string;
    appearance?: string;
    functionality?: string;
}



export default async function UsedStuffPage({
                                                params,
                                                searchParams
                                            }: {
                                                params: {slug: string}
                                                searchParams?: { [key: string]: string | string[] | undefined };
                                            }) {
    const listings = await getListings(decodeURIComponent(params.slug) || "", searchParams?.appearance, searchParams?.functionality);
    const currentUser = await getCurrentUser();

    // if (listings.length === 0) {
    //     return (
    //         <div>
    //             <EmptyState showReset/>
    //         </div>
    //     )
    // }

    return (
        <Container>
            <div className="font-semibold text-4xl">Browsing used stuffs in {decodeURIComponent(params.slug)} {params.slug === 'All' ? "categories" : "category"}</div>
            <div className="flex flex-row">
                <Filter category={params.slug || ""} directory={"usedStuff"}/>
                <div
                    className="
                        pt-24
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        xl:grid-cols-5
                        2xl:grid-cols-6
                        gap-8
                      "
                >
                    {listings.map((listing: any) => {
                        return (
                                <ItemListingCard
                                    currentUser={currentUser}
                                    key={listing.id}
                                    data={listing}
                                    category={params.slug}
                                />

                        )
                    })}
                </div>
            </div>
        </Container>
    );

}

// export default async function UsedStuffPage({ params }: {params: IParams}) {
//     const listings = await getListings(params.slug || "", params.appearance || "", params.functionality || "");
//     console.log("here is the slug: " + params.appearance);
//     const currentUser = await getCurrentUser();
//
//     // if (listings.length === 0) {
//     //     return (
//     //         <div>
//     //             <EmptyState showReset/>
//     //         </div>
//     //     )
//     // }
//
//     return (
//         <Container>
//             <div className="font-semibold text-4xl">{params.slug}</div>
//             <div className="flex flex-row">
//                 <Filter category={params.slug || ""}/>
//                 <div
//                     className="
//                         pt-24
//                         grid
//                         grid-cols-1
//                         sm:grid-cols-2
//                         md:grid-cols-3
//                         lg:grid-cols-4
//                         xl:grid-cols-5
//                         2xl:grid-cols-6
//                         gap-8
//                       "
//                 >
//                     {listings.map((listing: any) => {
//                         return (
//                             <div>
//                                 <ItemListingCard
//                                     currentUser={currentUser}
//                                     key={listing.id}
//                                     data={listing}
//                                 />
//
//                             </div>
//                         )
//                     })}
//                 </div>
//             </div>
//         </Container>
//     );
//
// }