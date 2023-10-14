import prisma from '@/libs/prismadb';

export default async function getListings(
    category: string,
    appearance: string | string[] | undefined,
    functionality: string | string[] | undefined
) {
    try {
        // Start with an empty where object
        const where: any = {};

        // If category is provided and it's not "all" or "", add it to the where object
        if (category && category !== "All" && category !== "") {
            where.category = category;
        }

        // If appearance is provided, add it to the where object
        if (appearance) {
            where.appearanceCondition = Array.isArray(appearance) ? { in: appearance } : appearance;
        }

        // If functionality is provided, add it to the where object
        if (functionality) {
            where.functionalCondition = Array.isArray(functionality) ? { in: functionality } : functionality;
        }

        const listings = await prisma.listing.findMany({
            where: where, // Use the dynamically built where object
            orderBy: {
                createdAt: 'desc'
            }
        })

        return listings;
    } catch (error: any) {
        throw new Error(error);
    }
}
