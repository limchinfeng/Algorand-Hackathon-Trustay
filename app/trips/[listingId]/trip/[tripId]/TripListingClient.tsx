'use client';

import Container from '@/app/components/Container';
import { categories } from '@/app/components/navbar/Categories';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import axios from 'axios';
import { eachDayOfInterval, differenceInCalendarDays } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Range } from 'react-date-range';
import { toast } from 'react-hot-toast';
import TripListingHead from '../../../_components/TripListingHead';
import TripListingReservation from '../../../_components/TripListingReservation';
import TripListingInfo from '../../../_components/TripListingInfo';
import { Reservation } from '@prisma/client';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  };

interface TripListingClientProps {
   reservations?: SafeReservation[];
   listing: SafeListing & {
    user: SafeUser
   } ;
   currentUser?: SafeUser | null;
   params: {listingId: string; tripId: string}
}


const TripListingClient: React.FC<TripListingClientProps> = ({
    listing, currentUser, reservations = [], params
}) => {

    const loginModal = useLoginModal();
    const router = useRouter();
    const [totalPrice, setTotalPrice] = useState(0);
    const [reservation, setReservation] = useState<SafeReservation>();
    const [isLoading, setIsLoading] = useState(false);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const reservedDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });
            
            if(reservation.id === params.tripId) {
                setTotalPrice(reservation.totalPrice)

                setReservation(reservation);
                dates = [...dates, ...range];
                setDateRange({
                    startDate: new Date(reservation.startDate),
                    endDate: new Date(reservation.endDate),
                })
                
            }
        });

        return dates;
    }, [reservations])


    // const onCreateReservation = useCallback(() => {
    //     if(!currentUser) {
    //         return loginModal.onOpen();
    //     }

    //     setIsLoading(true);

    //     axios.post('/api/reservations', {
    //         totalPrice,
    //         startDate: dateRange.startDate,
    //         endDate: dateRange.endDate,
    //         listingId: listing?.id
    //     })
    //     .then(() => {
    //         toast.success('Listing reserved!');
    //         setDateRange(initialDateRange);
    //         router.push('/trips');
    //         router.refresh();
    //     })
    //     .catch(() => {
    //         toast.error('Something went wrong');
    //     })
    //     .finally(() => {
    //         setIsLoading(false);
    //     })

    // }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal])

    // useEffect(() => {
    //     if(dateRange.startDate && dateRange.endDate) {
    //         const dayCount = differenceInCalendarDays(
    //             dateRange.endDate,
    //             dateRange.startDate
    //         );

    //         if(dayCount && listing.price) {
    //             setTotalPrice(dayCount * listing.price);
    //         } else {
    //             setTotalPrice(listing.price);
    //         }
    //     }
    // }, [dateRange, listing.price]);

    const category = useMemo(() => {
        return categories.find((item) =>
            item.label === listing.category ) 
    }, [listing.category]);


  return (
    <Container>
        <div className='max-w-screen-lg mx-auto'>
            <div className='flex flex-col gap-6'>
                <TripListingHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}
                />
                <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
                    <TripListingInfo
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        latitude={listing.latitude}
                        longitude={listing.longitude}
                        roomCount={listing.roomCount}
                        guestCount={listing.guestCount}
                        bathroomCount={listing.bathroomCount}
                        locationValue={listing.locationValue}
                        title={listing.title}
                        address={listing.address}
                    />
                    <div className='order-first mb-10 md:order-last md:col-span-3'>
                        <TripListingReservation
                            reservation={reservation} 
                            price={listing.price}
                            totalPrice={reservation?.totalPrice || 0}
                            onChangeDate={() => {}}
                            dateRange={dateRange}
                            onSubmit={() => {}}
                            reservedDates={reservedDates}
                            
                        />
                    </div>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default TripListingClient