import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        email, name, password, ic
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const hashedId  = await bcrypt.hash(email, password.length);
    const hashedIC  = await bcrypt.hash(ic, 10);

    const user = await prisma.user.create({
        data: {
            email, name, hashedPassword, hashedId, ic, hashedIC
        }
    });

    return NextResponse.json(user);
}