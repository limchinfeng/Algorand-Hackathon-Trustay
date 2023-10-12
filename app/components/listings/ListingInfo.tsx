'use client';

import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import React, { useEffect, useState } from 'react'
import { IconType } from 'react-icons';
import Avatar from '../Avatar';
import dynamic from 'next/dynamic';
import Heading from '../Heading';
import {FiUsers} from "react-icons/fi"
import {BiBed, BiBath} from "react-icons/bi"

const Map = dynamic(() => import('../Map'), {
    ssr: false
})

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    category: {
        icon: IconType
        label: string;
        description: string;
    } | undefined
    locationValue: string;
    latitude: number;
    longitude: number;
    title: string;
    address: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user, description, guestCount, roomCount, bathroomCount, category, locationValue, latitude, longitude, title, address
}) => {
    const {getByValue} = useCountries();

    const coordinates: [number, number] = [latitude, longitude]

    const location = getByValue(locationValue);


  return (
    <div className='col-span-4 flex flex-col gap-8'>
        <Heading 
            title={title}
            address={address}
            subtitle={`${location?.region}, ${location?.label}`}
        />

        <div className='flex flex-col gap-2'>
            <div className='text-xl font-semibold gap-4'>
                <div className='text-2xl font-bold'>
                    Host
                </div>
                <div className='flex flex-row gap-2 mt-2'>
                    <Avatar src={user?.image}/>
                    <div>{user?.name}</div>
                </div>
            </div>
        </div>

        <div className='flex flex-col gap-2 font-light'>
            <div className='text-2xl font-bold'>
                Description
            </div>
            <div className='text-lg font-light text-neutral-500'>
                {description}
            </div>
            <div className='flex flex-row gap-8'>
                <div className='flex flex-row gap-2'>
                    <FiUsers size={24} />
                    {guestCount} guests
                </div>
                <div className='flex flex-row gap-2'>
                    <BiBed size={24}/>
                    {roomCount} rooms
                </div>
                <div className='flex flex-row gap-2'>
                    <BiBath size={24}/>
                    {bathroomCount} bathrooms
                </div>
            </div>
        </div>

        <Map center={coordinates} />
    </div>
  )
}

export default ListingInfo