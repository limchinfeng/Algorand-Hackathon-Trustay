"use client";

import React, { useState, useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { usePathname, useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const containsHost = pathname?.includes('/host');

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // open rent modal
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {/* <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full 
            hover:bg-neutral-100 transition cursor-pointer"
        >
          Add your property
        </div> */}

        {containsHost ? <>
          <div 
            className="block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            onClick={() => router.push("/")}
          >
            Go to Guest
          </div>
        </> : <>
          <div 
            className="block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            onClick={() => router.push("/host")}
          >
            Go to Host
          </div>
        </>}

        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row
            items-center gap-3 rounded-full cursor-pointer hover:shadow-sm transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute rounded-xl shadow-md w-[40vm] md:w-3/4 bg-white 
            overflow-hidden right-0 top-12 text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                {containsHost ? <>
                  <MenuItem onClick={() => router.push("/host/reservations")} label="My reservations" />
                  <MenuItem onClick={() => router.push("/host/properties")} label="My properties" />
                  <MenuItem onClick={() => router.push("/host/claimReport")} label="My claim&report" />
                  <MenuItem onClick={rentModal.onOpen} label="Add property" />
                </> : <>
                  <MenuItem onClick={() => router.push("/trips")} label="My trips" />
                  <MenuItem onClick={() => router.push("/favorites")} label="My favorites" />
                </>}

                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Log In" />
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
