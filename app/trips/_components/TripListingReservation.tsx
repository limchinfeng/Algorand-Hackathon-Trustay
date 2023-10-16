'use client';

import Button from '@/app/components/Button';
import Calendar from '@/app/components/inputs/Calendar';
import React, { useCallback, useState } from 'react'
import { Range } from 'react-date-range';
import TripCalendar from './TripCalendar';
import { SafeReservation } from '@/app/types';
import {LiaMoneyBillSolid} from 'react-icons/lia'
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

interface TripListingReservationProps {
    price: number;
    dateRange: Range,
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    reservedDates: Date[];
    total?: GLfloat
    reservation?: SafeReservation;
    params: {listingId: string; tripId: string}
  }

const TripListingReservation: React.FC<TripListingReservationProps> = ({
    price, dateRange, totalPrice, onChangeDate, onSubmit, disabled, reservedDates, total, reservation, params
}) => {
    const startDate = reservation?.startDate || 2023-10-23;
    const endDate = reservation?.endDate || 2023-10-23;
    const createDate = reservation?.createdAt || 2023-10-23;

    const formattedStartDates = startDate.toLocaleString('en-GB')
    const formattedStartDate = new Date(formattedStartDates)
    const formatted_StartDate = format(formattedStartDate, 'dd/MM/yy');

    const formattedEndDates = endDate.toLocaleString('en-GB')
    const formattedEndDate = new Date(formattedEndDates)
    const formatted_EndDate = format(formattedEndDate, 'dd/MM/yy');

    const formattedCreateDates = createDate.toLocaleString('en-GB')
    const formattedCreateDate = new Date(formattedCreateDates)
    const formatted_CreateDate = format(formattedCreateDate, 'dd/MM/yy');

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = useCallback(() => {
        setDeletingId(params.tripId);
        setIsLoading(true);

        axios.delete(`/api/reservations/${params.tripId}`)
        .then(() => {
            toast.success('Reservation cancelled');
            router.refresh();
            router.push('/trips');
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error);
        })
        .finally(() => {
            setIsLoading(false);
            setDeletingId('');
        })
    }, [])


  return (
    <div className='gap-4'>
        <div className='flex flex-col gap-2 font-light'>
            <div className='text-2xl font-bold'>
                Booked
            </div>
            <div className='flex flex-row justify-between items-center gap-1'>
                <div className='flex flex-row gap-2 text-xl font-semibold'>
                    <LiaMoneyBillSolid size={24} /> RM {totalPrice}
                </div>
                <div className='font-light text-neutral-600'>
                    Booked at {formatted_CreateDate}
                </div>
            </div>
            <div className='font-light '>
                {formatted_StartDate} - {formatted_EndDate} 
            </div>
        </div>
        <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden mt-6'>
            <TripCalendar 
                value={dateRange}
                reservedDates={reservedDates}
                onChange={(value) => {}}
                />
            <hr />
            <div className='p-4'>
                <Button 
                    disabled={isLoading}
                    label="Cancel the reservation"
                    onClick={onDelete}
                    />
            </div>
            {/* <div className='p-4 flex flex-row items-center justify-start
            font-semibold text-lg gap-5'>
                <div>
                    Total:
                </div>
                <div>
                    RM {totalPrice}
                </div>
            </div> */}
        </div>
    </div>
  )
}

export default TripListingReservation