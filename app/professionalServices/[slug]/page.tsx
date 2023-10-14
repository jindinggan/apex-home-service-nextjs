import getCurrentUser from "@/app/actions/getCurrentUser";
import Container from "@/components/Container";
import Filter from "@/components/filter/Filter";
import ItemListingCard from "@/components/listings/ItemListingCard";
import getServices from "@/app/actions/getServices";
import ServiceListingCard from "@/components/listings/ServiceListingCard";
import SearchBarWithDropdown from "@/components/banner/SearchBarWithDropdown";
import SearchBanner from "@/components/banner/SearchBanner";
import ZipCodeFilter from "@/components/filter/ZipCodeFilter";

export default async function UsedStuffPage({
                                                params,
                                                searchParams
                                            }: {
    params: {slug: string}
    searchParams?: { [key: string]: string | string[] | undefined };
}) {

    const services = await getServices(decodeURIComponent(params.slug) || "", searchParams?.zipcode);

    const currentUser = await getCurrentUser();
    return (
                <div className="
                    w-4/5
                    max-w-[2020px]
                    mx-auto
                    xl:px-20
                    md:px-10
                    sm:px-2
                    px-4">
                    <div className="font-semibold text-4xl pb-3">{params.slug === 'All' ? "All Services" : decodeURIComponent(params.slug)}</div>
                    <ZipCodeFilter category={params.slug} directory={"professionalServices"}/>
                    <div className="flex flex-row">
                        <Filter category={params.slug || ""} directory={"professionalServices"}/>
                        <div className="pt-24 grid grid-cols-1 gap-2 px-10">


                                {services.map((service: any) => {
                                    return (

                                            <ServiceListingCard
                                                currentUser={currentUser}
                                                key={service.id}
                                                data={service}
                                                category={decodeURIComponent(params.slug)}
                                            />
                                    )
                                })}
                        </div>
                    </div>
                </div>
    );
}