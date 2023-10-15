'use client';

import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import React from 'react'
import Image from 'next/image';
import HeartButton from '@/app/components/HeartButton';


interface TripListingHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
}

const TripListingHead: React.FC<TripListingHeadProps> = ({
    title, locationValue, imageSrc, id, currentUser
}) => {
    const {getByValue} = useCountries();

    const location = getByValue(locationValue);

  return (
    <>
        <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
            <Image 
                alt="Image"
                src={imageSrc}
                fill
                className='object-cover w-full'
            />
            <div className='absolute top-5 right-5'>
                <HeartButton 
                    listingId={id}
                    currentUser={currentUser}
                />
            </div>
        </div>
    </>
  )
}

export default TripListingHead