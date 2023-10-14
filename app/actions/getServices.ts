import prisma from '@/libs/prismadb';
import {LocationValue} from "@/interfaces/list.locationValue.model";
export default async function getServices(
    category: string,
    zipcode: string | string[] | undefined,
) {
    try {
        // Start with an empty where object
        const where: any = {};

        // If category is provided and it's not "all" or "", add it to the where object
        if (category && category !== "All" && category !== "") {
            where.category = category;
        }

        const services = await prisma.service.findMany({
            where: where, // Use the dynamically built where object
            orderBy: { createdAt: 'desc' }
        });

        if (zipcode) {
            const zipcodes = Array.isArray(zipcode) ? zipcode : [zipcode];
            return services.filter(service =>
                service.locationValue && zipcodes.includes((service.locationValue as unknown as LocationValue)?.value)
            );
        }

        return services;
    } catch (error: any) {
        throw new Error(error);
    }
}

