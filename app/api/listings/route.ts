import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getLatLngFromAddress from "@/app/actions/getLatLngFromAddress";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title, description, imageSrc, category, roomCount, bathroomCount, 
        guestCount, location, price, address
    } = body;

      // Get latitude and longitude from the address
    let latLng;
    try {
        latLng = await getLatLngFromAddress(address);
    } catch (error) {
        console.log("[LISTING_LATLNG]", error);
        return new NextResponse("Internal Error", {status: 500})
    }

    latLng.lat

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            address,
            latitude: latLng.lat,
            longitude: latLng.lng,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing);
}