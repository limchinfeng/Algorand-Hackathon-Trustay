'use client';

import React from 'react'
import { Range } from 'react-date-range';
import Calendar from '../inputs/Calendar';
import Button from '../Button';
import useReservationModal from '@/app/hooks/useReservationModal';
import ReservationModal from '@/app/listings/[listingId]/_components/ReservationModal';
import ClientOnly from '../ClientOnly';
import { SafeListing, SafeUser } from '@/app/types';
import ReservationConfirmationModal from '@/app/listings/[listingId]/_components/ReservationConfirmationModal';

interface ListingReservationProps {
    price: number;
    dateRange: Range,
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
    listingUser: SafeUser;
    currentUser: SafeUser | null | undefined;
  }

const ListingReservation: React.FC<ListingReservationProps> = ({
    price, dateRange, totalPrice, onChangeDate, onSubmit, disabled, disabledDates, listingUser, currentUser
}) => {
    const reservationConfirmationModal = useReservationModal();

  return (
    <>
        <ClientOnly>
            <ReservationModal 
                hostName={listingUser.name}
                hostHashedId={listingUser.hashedId}
                renterName={currentUser?.name}
                renterHashedId={currentUser?.hashedId}
                totalPrice={totalPrice}
                onSubmit={onSubmit}
                disabled={disabled}
            />
        </ClientOnly>
        
        <div className='gap-4'>
            <div className='flex flex-col gap-2 font-light'>
                <div className='text-2xl font-bold'>
                    Booking
                </div>
                <div className='flex flex-row items-center gap-1'>
                    <div className='text-xl font-semibold'>
                        RM {price}
                    </div>
                    <div className='font-light text-neutral-600'>
                        night
                    </div>
                </div>
            </div>
            <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden mt-6'>
                <Calendar 
                    value={dateRange}
                    disabledDates={disabledDates}
                    onChange={(value) => onChangeDate(value.selection)}
                    />
                <hr />
                <div className='p-4'>
                    <Button 
                        disabled={disabled}
                        label="Reserve"
                        onClick={reservationConfirmationModal.onOpen}
                        />
                </div>
                <div className='p-4 flex flex-row items-center justify-start
                font-semibold text-lg gap-5'>
                    <div>
                        Total:
                    </div>
                    <div>
                        RM {totalPrice}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ListingReservation