"use client";

import React, { useCallback, useState } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";;
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import ReservationConfirmationModal from "./ReservationConfirmationModal";
import useReservationModal from "@/app/hooks/useReservationModal";
import {FaRegUser} from "react-icons/fa";
import { SafeListing, SafeUser } from "@/app/types";


interface ReservationModelProps {
  hostName: string | null;
  renterName: string | null | undefined;
  totalPrice: number;
  onSubmit: () => void;
  disabled: boolean | undefined;
}


const text =
`
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem donec massa sapien faucibus et molestie ac feugiat sed. Lorem ipsum dolor sit amet consectetur adipiscing elit. Risus sed vulputate odio ut enim blandit. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere. Malesuada fames ac turpis egestas sed tempus urna et pharetra. Nisi scelerisque eu ultrices vitae auctor. Quisque sagittis purus sit amet volutpat consequat mauris nunc congue. Netus et malesuada fames ac. Laoreet suspendisse interdum consectetur libero id faucibus. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. Facilisis leo vel fringilla est ullamcorper eget nulla. Ut lectus arcu bibendum at varius vel. Velit laoreet id donec ultrices tincidunt arcu non. Sed felis eget velit aliquet. Vestibulum mattis ullamcorper velit sed. Leo duis ut diam quam nulla porttitor massa.

Fringilla ut morbi tincidunt augue interdum velit euismod. Massa enim nec dui nunc mattis. Orci ac auctor augue mauris. Commodo sed egestas egestas fringilla. Id leo in vitae turpis massa sed. Adipiscing vitae proin sagittis nisl rhoncus. Dictum fusce ut placerat orci nulla. Nunc non blandit massa enim nec dui nunc mattis. Malesuada fames ac turpis egestas sed tempus. Mauris nunc congue nisi vitae suscipit tellus mauris a. Sit amet mattis vulputate enim.

Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Gravida neque convallis a cras semper auctor neque vitae tempus. Egestas congue quisque egestas diam in arcu. Vitae et leo duis ut diam quam nulla porttitor. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit. Enim diam vulputate ut pharetra sit amet aliquam id. Odio euismod lacinia at quis risus sed vulputate odio. Adipiscing elit duis tristique sollicitudin nibh. Venenatis lectus magna fringilla urna porttitor. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Elementum sagittis vitae et leo. Cras tincidunt lobortis feugiat vivamus at augue. Magna etiam tempor orci eu. A erat nam at lectus urna duis convallis convallis tellus.

Amet dictum sit amet justo donec enim diam. Id aliquet lectus proin nibh nisl. Euismod nisi porta lorem mollis aliquam ut porttitor leo a. Pellentesque adipiscing commodo elit at imperdiet dui. Viverra nibh cras pulvinar mattis. Amet nisl suscipit adipiscing bibendum est. Est velit egestas dui id ornare. Et pharetra pharetra massa massa ultricies mi quis hendrerit. Mauris sit amet massa vitae tortor condimentum. Eu facilisis sed odio morbi quis commodo. Et netus et malesuada fames ac turpis. Sed 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem donec massa sapien faucibus et molestie ac feugiat sed. Lorem ipsum dolor sit amet consectetur adipiscing elit. Risus sed vulputate odio ut enim blandit. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere. Malesuada fames ac turpis egestas sed tempus urna et pharetra. Nisi scelerisque eu ultrices vitae auctor. Quisque sagittis purus sit amet volutpat consequat mauris nunc congue. Netus et malesuada fames ac. Laoreet suspendisse interdum consectetur libero id faucibus. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. Facilisis leo vel fringilla est ullamcorper eget nulla. Ut lectus arcu bibendum at varius vel. Velit laoreet id donec ultrices tincidunt arcu non. Sed felis eget velit aliquet. Vestibulum mattis ullamcorper velit sed. Leo duis ut diam quam nulla porttitor massa.

Fringilla ut morbi tincidunt augue interdum velit euismod. Massa enim nec dui nunc mattis. Orci ac auctor augue mauris. Commodo sed egestas egestas fringilla. Id leo in vitae turpis massa sed. Adipiscing vitae proin sagittis nisl rhoncus. Dictum fusce ut placerat orci nulla. Nunc non blandit massa enim nec dui nunc mattis. Malesuada fames ac turpis egestas sed tempus. Mauris nunc congue nisi vitae suscipit tellus mauris a. Sit amet mattis vulputate enim.

Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Gravida neque convallis a cras semper auctor neque vitae tempus. Egestas congue quisque egestas diam in arcu. Vitae et leo duis ut diam quam nulla porttitor. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit. Enim diam vulputate ut pharetra sit amet aliquam id. Odio euismod lacinia at quis risus sed vulputate odio. Adipiscing elit duis tristique sollicitudin nibh. Venenatis lectus magna fringilla urna porttitor. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Elementum sagittis vitae et leo. Cras tincidunt lobortis feugiat vivamus at augue. Magna etiam tempor orci eu. A erat nam at lectus urna duis convallis convallis tellus.

Amet dictum sit amet justo donec enim diam. Id aliquet lectus proin nibh nisl. Euismod nisi porta lorem mollis aliquam ut porttitor leo a. Pellentesque adipiscing commodo elit at imperdiet dui. Viverra nibh cras pulvinar mattis. Amet nisl suscipit adipiscing bibendum est. Est velit egestas dui id ornare. Et pharetra pharetra massa massa ultricies mi quis hendrerit. Mauris sit amet massa vitae tortor condimentum. Eu facilisis sed odio morbi quis commodo. Et netus et malesuada fames ac turpis. Sed 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem donec massa sapien faucibus et molestie ac feugiat sed. Lorem ipsum dolor sit amet consectetur adipiscing elit. Risus sed vulputate odio ut enim blandit. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere. Malesuada fames ac turpis egestas sed tempus urna et pharetra. Nisi scelerisque eu ultrices vitae auctor. Quisque sagittis purus sit amet volutpat consequat mauris nunc congue. Netus et malesuada fames ac. Laoreet suspendisse interdum consectetur libero id faucibus. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. Facilisis leo vel fringilla est ullamcorper eget nulla. Ut lectus arcu bibendum at varius vel. Velit laoreet id donec ultrices tincidunt arcu non. Sed felis eget velit aliquet. Vestibulum mattis ullamcorper velit sed. Leo duis ut diam quam nulla porttitor massa.

Fringilla ut morbi tincidunt augue interdum velit euismod. Massa enim nec dui nunc mattis. Orci ac auctor augue mauris. Commodo sed egestas egestas fringilla. Id leo in vitae turpis massa sed. Adipiscing vitae proin sagittis nisl rhoncus. Dictum fusce ut placerat orci nulla. Nunc non blandit massa enim nec dui nunc mattis. Malesuada fames ac turpis egestas sed tempus. Mauris nunc congue nisi vitae suscipit tellus mauris a. Sit amet mattis vulputate enim.

Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Gravida neque convallis a cras semper auctor neque vitae tempus. Egestas congue quisque egestas diam in arcu. Vitae et leo duis ut diam quam nulla porttitor. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit. Enim diam vulputate ut pharetra sit amet aliquam id. Odio euismod lacinia at quis risus sed vulputate odio. Adipiscing elit duis tristique sollicitudin nibh. Venenatis lectus magna fringilla urna porttitor. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Elementum sagittis vitae et leo. Cras tincidunt lobortis feugiat vivamus at augue. Magna etiam tempor orci eu. A erat nam at lectus urna duis convallis convallis tellus.

Amet dictum sit amet justo donec enim diam. Id aliquet lectus proin nibh nisl. Euismod nisi porta lorem mollis aliquam ut porttitor leo a. Pellentesque adipiscing commodo elit at imperdiet dui. Viverra nibh cras pulvinar mattis. Amet nisl suscipit adipiscing bibendum est. Est velit egestas dui id ornare. Et pharetra pharetra massa massa ultricies mi quis hendrerit. Mauris sit amet massa vitae tortor condimentum. Eu facilisis sed odio morbi quis commodo. Et netus et malesuada fames ac turpis. Sed 

`

const ReservationModel = ({
  hostName, renterName, totalPrice, onSubmit, disabled
}: ReservationModelProps) => {
  const reservationConfirmationModal = useReservationModal();

  const bodyContent = (
    <div className="flex flex-col items-center justify-center gap-7">
      <div className="flex flex-col justify-center items-center border-gray-700 border rounded-lg p-5 gap-4 w-[80%]">
        <h1 className="text-2xl font-bold">
          I hereby agree that
        </h1>
        <div className="overflow-y-scroll h-36 w-full ">
          {text}
        </div>
      </div>

      <div className="flex flex-row gap-10 w-full md:gap-40">
        <div className="flex flex-col items-center  w-full"> 
          <h1 className="text-2xl font-bold">
            Host
          </h1>
          <p className="text-gray-700 font-light flex flex-row gap-2 items-center">
            <FaRegUser size={18} />
              {hostName}
          </p>
          <div className="border-gray-800 border rounded-lg h-32 w-4/5 mt-3">

          </div>
        </div>

        <div className="flex flex-col items-center w-4/5"> 
          <h1 className="text-2xl font-bold">
            Renter
          </h1>
          <p className="text-gray-700 font-light flex flex-row gap-2 items-center">
            <FaRegUser size={18} />
            {renterName}
          </p>
          <div className="border-gray-700 border rounded-lg h-32 w-full mt-3">

          </div>
          <div className="flex flex-col gap-4 mt-3 w-full ">
            <p>
              RM {totalPrice}
            </p>
            <Button
              label="Continue"
              onClick={onSubmit}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </div>
  )

  const footerContent = (
    <></>
    // <div className="flex flex-col gap-4 mt-3 w-[30%] ">
    //   <p>
    //     Total RM100
    //   </p>
    //   <Button
    //     label="Continue"
    //     onClick={() => {}}
    //   />
    // </div>
  );

  return (
    <ReservationConfirmationModal
      isOpen={reservationConfirmationModal.isOpen}
      title="Rental Agreement"
      onClose={reservationConfirmationModal.onClose}
      body={bodyContent}
      footer={footerContent}
      disabled={disabled}
    />
  );
};

export default ReservationModel;
