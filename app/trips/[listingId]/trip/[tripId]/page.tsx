import React from 'react'
import getListingById from '@/app/actions/getListingById'
import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservation from '@/app/actions/getReservations'; 

import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';

import getTripListingById from '@/app/actions/getTripListingById';
import getTripReservations from '@/app/actions/getTripReservations';
import TripListingClient from './TripListingClient';
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId: string;
  tripId: string;
}

// params = url = id
const TripListingPage = async ({params} : {params: IParams}) => {

    const listing = await getTripListingById(params);
    const currentUser = await getCurrentUser();
    const reservations = await getTripReservations(params);
  
    if(!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    return (
<ClientOnly>
      <TripListingClient
          listing={listing}
          reservations={reservations}
          currentUser={currentUser} 
          params={{
            listingId: params.listingId,
            tripId: params.tripId
          }}      />
    </ClientOnly>

  )
}

export default TripListingPage