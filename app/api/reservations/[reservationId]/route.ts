import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    reservationId?: string;
}

export async function DELETE(
    request: Request,
    {params} : {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const {reservationId} = params;

    if(!reservationId || typeof reservationId !== 'string') {
        throw new Error("Invalid ID");
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                {userId: currentUser.id},   //user
                {listing: {userId: currentUser.id}}  //owner
            ]
        }
    });

    return NextResponse.json(reservation);
}