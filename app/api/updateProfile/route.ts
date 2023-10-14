import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";

export async function PATCH(
    request: Request,
) {
    const body = await request.json();
    const {
        id,
        email,
        username,
    } = body;

    const user = await prisma.user.update({
        where:{
            id: id,
        },
        data: {
            email: email,
            name: username,
        }
    });

    return NextResponse.json(user);
}
