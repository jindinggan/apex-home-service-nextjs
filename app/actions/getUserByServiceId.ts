import prisma from '@/libs/prismadb';

export default async function getUserByServiceId(
    serviceId: string,
) {
    try {
        const service = await prisma.service.findUnique({
            where: {
                id: serviceId
            },
            include: {
                user: true
            }
        });

        if (!service) {
            return null;
        }

        const user = await prisma.user.findUnique({
            where: {
                id: service.userId
            }
        });

        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}
