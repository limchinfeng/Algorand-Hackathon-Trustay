import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    reportId?: string;
}

export async function DELETE(
    request: Request,
    {params}: {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const {reportId} = params;

    if(!reportId || typeof reportId !== 'string') {
        throw new Error('Invalid ID');
    }

    const report = await prisma.report.deleteMany({
        where: {
            id: reportId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(report);
}