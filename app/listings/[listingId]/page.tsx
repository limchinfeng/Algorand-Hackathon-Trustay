import React from 'react'
import getListingById from '@/app/actions/getListingById'
import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservation from '@/app/actions/getReservations'; 

import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';

import ListingClient from './ListingClient';

interface IParams {
    listingId?: string;
}

// params = url = id
const ListingPage = async ({params} : {params: IParams}) => {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();
    const reservations = await getReservation(params);
  
    if(!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    return (
<ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>

  )
}

export default ListingPage