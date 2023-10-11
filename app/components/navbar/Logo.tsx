'use client';

import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '../../../public/images/logo.png';


const Logo = () => {
    const router = useRouter();

  return (
    <div
        onClick={() => router.push('/')} 
        className='hidden md:block cursor-pointer text-3xl text-primary font-extrabold'
    >
      Trustay
    </div>
  )
}

export default Logo