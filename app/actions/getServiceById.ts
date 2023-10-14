import prisma from '@/libs/prismadb';

export default async function getServiceById(
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
        return service;
    } catch (error: any) {
        throw new Error(error);
    }
}
