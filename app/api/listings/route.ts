import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/libs/prismadb';


export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        name,
        brand,
        description,
        imageSrc,
        category,
        appearanceCondition,
        functionalCondition,
        location,
        price
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });


    const listing = await prisma.listing.create({
        data: {
            name,
            brand,
            description,
            imageSrc,
            category,
            appearanceCondition,
            functionalCondition,
            locationValue: location,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing);
}