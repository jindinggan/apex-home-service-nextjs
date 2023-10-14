import prisma from '@/libs/prismadb';

export default async function getListingById(
    itemId: string,
) {
    try {
        const item = await prisma.listing.findUnique({
            where: {
                id: itemId
            },
            include: {
                user: true
            }
        });

        if (!item) {
            return null;
        }
        return item;
    } catch (error: any) {
        throw new Error(error);
    }
}
