'use client';

import {Listing, Reservation} from "@prisma/client";
import {SafeUser} from "@/types";
import {useRouter} from "next/navigation";
import useCountries from "@/hooks/useCountries";
import {useCallback, useMemo} from "react";
import Image from "next/image";
import HeartButton from "@/components/HeartButton";
import {LocationValue} from "@/interfaces/list.locationValue.model";



interface ItemListingCardProps {
    data: Listing
    reservation?: Reservation
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
    category?: string;
}
const ItemListingCard: React.FC<ItemListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser,
    category
                                                 }) => {

    const router = useRouter();
    const{ getByValue } = useCountries();
    // const location = getByValue(data.locationValue);
    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            if (disabled) {
                return;
            }

            onAction?.(actionId);
        }, [onAction, actionId, disabled])


    const price = useMemo(() => {
        if(reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data.price])


    return(
        <div
            onClick={() => router.push(`/usedStuff/itemDetail/${data.id}`)}
            className="col-span-1 cursor-pointer group"
        >
            <div className="flex flex-col gap-2 w-full">
                <div
                    className="
                        aspect-square
                        w-full
                        relative
                        overflow-hidden
                        rounded-xl
                    "
                >
                    <Image
                        fill
                        alt="listing"
                        src={data.imageSrc}
                        className="
                            object-cover
                            h-full
                            w-full
                            group-hover:scale-110
                            transition
                        "
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                            isShow
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {data.name}, {data.brand}
                </div>
                <div className="font-light text-neutral-500">
                    {data.appearanceCondition}, {data.functionalCondition}
                </div>
                {/*<div className="flex flex-row items-center gap-1">*/}
                    <div className="font-semibold flex">
                        <div>
                            $ {price}
                        </div>
                        <div className="ml-auto">
                            {(data.locationValue as unknown as LocationValue)?.label}
                        </div>
                    </div>
                {/*</div>*/}
            </div>
        </div>
    );
}

export default ItemListingCard;