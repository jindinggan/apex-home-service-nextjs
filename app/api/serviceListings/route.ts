import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/libs/prismadb';


export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();
    console.log("im here")
    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        name,
        category,
        imageSrc,
        priceRangeLowBound,
        priceRangeHighBound,
        services,
        areasServed,
        serviceDescription,
        location,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });


    const serviceListing = await prisma.service.create({
        data: {
            name,
            category,
            imageSrc,
            areasServed,
            priceRangeLowBound: parseInt(priceRangeLowBound, 10),
            priceRangeHighBound: parseInt(priceRangeHighBound, 10),
            services,
            serviceDescription,
            locationValue: location,
            userId: currentUser.id
        }
    })

    return NextResponse.json(serviceListing);
}