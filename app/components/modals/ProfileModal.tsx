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
import {AiOutlineCheckCircle, AiOutlineDelete} from "react-icons/ai"
import { report } from "process";
import { useRouter } from "next/navigation";

interface ProfileModalProps {
  currentUser?: SafeUser | null;
  reports: { id: string; userId: string; listingId: string; createdAt: Date; }[];
}

const ProfileModal = ({
  currentUser, reports
}: ProfileModalProps) => {
  const profileModal = useProfileModal();
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

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

  const dateArray: Date[] = reports.map((report) => new Date(report.createdAt));
  const dateStringArray: string[] = dateArray.map((date) =>
    date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    })
  );

  const onDelete = (id: string) => {
    setIsLoading(true);

    axios.delete(`/api/reports/${id}`)
    .then(() => {
        toast.success('Report cancelled');
        router.refresh();
        setTimeout(() => {
          profileModal.onOpen();
        }, 2000);
    })
    .catch((error) => {
        toast.error("Something went wrong!");
    })
    .finally(() => {
        setIsLoading(false);
    })
  }


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
    <div className="flex flex-col justify-start items-center w-full ">
      <h1 className="text-2xl font-bold">
        Report 
      </h1>
      <div className="flex flex-col justify-center items-center gap-1 mt-3 w-2/3 h-40 overflow-y-scroll p-5">

        {reports.length >= 4 && 
          <div className="h-10 mb-16" />
        }


        {reports.map((report, index) => (
          <div 
            className="flex items-center border border-primary w-full mt-2"
            key={report.id}
          >
            <div className="h-10 w-10 bg-primary text-white hover:bg-primary/90 flex  justify-center items-center">
              {index + 1}
            </div>
            <div className="w-full p-2 flex flex-row justify-between items-center">
              <div>
                {report.id}
              </div>
              <div className="text-light text-xs text-gray-600">
                {dateStringArray[index]}
              </div>  
            </div>
            <button 
              disabled={isLoading} 
              onClick={() => onDelete(report.id)} 
              className="h-10 w-10 bg-primary text-white hover:bg-primary/90 flex  justify-center items-center"
            >
              <>
                <AiOutlineDelete />
              </>
            </button>
          </div>
        ))}
      </div>
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
