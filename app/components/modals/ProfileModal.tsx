"use client";

import React, { useCallback, useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useProfileModal from "@/app/hooks/useProfileModal";
import { SafeUser } from "@/app/types";
import ModalWithoutButton from "./ModalWithoutButton";
import Avatar from "../Avatar";
import Image from "next/image";
import avatar from '@/public/images/placeholder.jpg';
import {BiCopy} from "react-icons/bi";
import {AiOutlineCheckCircle} from "react-icons/ai"

interface ProfileModalProps {
  currentUser?: SafeUser | null;
}

const ProfileModal = ({
  currentUser
}: ProfileModalProps) => {
  const profileModal = useProfileModal();
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const userName = currentUser?.name || "";
  const userEmail = currentUser?.email || "";
  const userPublicId = currentUser?.hashedId || "";

  const onCopy = () => {
    navigator.clipboard.writeText(userPublicId);
    setCopied(true);
    setIsLoading(true);
    toast.success("Copied Successfully")

    setTimeout(() => {
      setCopied(false);
      setIsLoading(false);
    }, 2000);
  }

  // const onSubmit: SubmitHandler<FieldValues> = (data) => {
  //   setIsLoading(true);

  //   axios.post('/api/register', data)
  //   .then(() => {
  //     toast.success('Registered!');
  //     registerModal.onClose();
  //     loginModal.onOpen();
  //   })
  //   .catch((error) => {
  //     toast.error(error);
  //   })
  //   .finally(() => {
  //     setIsLoading(false);
  //   })
  // }


  const bodyContent = (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex items-center justify-center">
        <Image 
          className='rounded-full'
          height='100'
          width='100'
          alt='Avatar'
          src={ currentUser?.image || avatar}
        />
      </div>  
      <Heading
        title={userName}
        subtitle={userEmail}
        center
      />
      <div className="flex flex-col w-2/3">
        <h1 className="text-primary font-bold">
          Public key
        </h1>
        <div className="flex items-center mt-2  border border-primary w-full">
          <input 
            disabled={isLoading}
            className="w-full p-2"
            value={userPublicId}
          />
          <button 
            disabled={isLoading} 
            onClick={onCopy} 
            className="h-10 w-10 bg-primary text-white hover:bg-primary/90 flex  justify-center items-center"
          >
            {copied ?
              <>
                <AiOutlineCheckCircle />
              </> : 
              <>
                <BiCopy />
              </>
            }
          </button>
        </div>
      </div>
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      g
    </div>
  );

  return (
    <ModalWithoutButton
      disabled={isLoading}
      isOpen={profileModal.isOpen}
      title="Profile"
      onClose={profileModal.onClose}
      onSubmit={() => {}}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default ProfileModal;
