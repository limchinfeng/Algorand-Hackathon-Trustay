'use client';

import React from 'react'
import { usePathname, useRouter } from 'next/navigation';


const Logo = () => {
    const router = useRouter();

    const pathname = usePathname();
    const containsHost = pathname?.includes('/host');

  return (
    <>
      {containsHost ? <>
        <div
          onClick={() => router.push('/host')} 
          className='hidden md:flex items-center justify-center flex-row gap-2 cursor-pointer text-3xl text-primary font-extrabold'
        >
          <div>
            Trustay
          </div>
          <p className='font-light text-base text-gray-600 mt-5'>
            host
          </p> 
        </div>
      </> : <>
      <div
          onClick={() => router.push('/')} 
          className='hidden md:block cursor-pointer text-3xl text-primary font-extrabold'
          >
        Trustay
      </div>
      </>}

    </>
  )
}

export default Logo