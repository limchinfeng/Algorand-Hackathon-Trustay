'use client';

import React from 'react';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import Categories from './Categories'
import { SafeUser } from "@/app/types";

interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
        
        <div
            className='py-4 border-b-[1px]'
        >
            <Container>
                <div className='
                 flex
                 flex-row
                 items-center
                 justify-between
                 gap-3 
                 md:gap-0
                '>
                    <div className='text-xl font-bold gap-5 flex flex-row'>
                        <p>Title</p>
                        <p>link</p>
                        <p>link</p>
                        <p>link</p>
                    </div>
                    <Logo />
                    <UserMenu currentUser={currentUser} />
                </div>
                
            </Container>

        </div>
        <Categories />

    </div>
  )
}

export default Navbar