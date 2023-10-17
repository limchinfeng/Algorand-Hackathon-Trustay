"use client";

import React, { useCallback, useState } from "react";
import Button from "@/app/components/Button";
import ReservationCancellationModal from "./ReservationCancellationModal";
import {FaRegUser} from "react-icons/fa";
import useCancellationModal from "@/app/hooks/useCancellationModal";


interface ReservationModelProps {
  hostName: string | null;
  hostHashedId: string | null;
  renterName: string | null | undefined;
  renterHashedId: string | null | undefined
  totalPrice: number;
  onDelete: () => void;
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
  hostName, renterName, totalPrice, onDelete, disabled, hostHashedId, renterHashedId
}: ReservationModelProps) => {
  const reservationCancellationModal = useCancellationModal();

  const bodyContent = (
    <div className="flex flex-col items-center justify-center gap-7">
      <div className="flex flex-col justify-center items-center border-gray-700 border rounded-lg p-5 gap-4  md:w-[80%] w-full">
        <h1 className="text-2xl font-bold">
          I hereby agree that
        </h1>
        <div className="overflow-y-scroll h-36 w-full ">
          {text}
        </div>
      </div>

      <div className="flex flex-col justify-center  md:flex-row md:justify-between gap-10 w-full md:gap-20">
        <div className="flex flex-col items-center md:w-2/6 w-full"> 
          <h1 className="text-2xl font-bold">
            Host
          </h1>
          <p className="text-gray-700 font-light flex flex-row gap-2 items-center">
            <FaRegUser size={18} />
              {hostName}
          </p>
          <div className="border-gray-800 border rounded-lg w-full h-32 mt-3 flex items-center justify-center">
            <p className="w-full text-sm break-words p-10">
              {hostHashedId}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center md:w-2/6 w-full"> 
          <h1 className="text-2xl font-bold">
            Renter
          </h1>
          <p className="text-gray-700 font-light flex flex-row gap-2 items-center">
            <FaRegUser size={18} />
            {renterName}
          </p>
          <div className="border-gray-800 border rounded-lg w-full h-32 mt-3 flex items-center justify-center">
            <p className="w-full text-sm break-words p-10">
              {renterHashedId}
            </p>
          </div>
          <div className="flex flex-col gap-4 mt-3 w-full ">
            <p>
              RM {totalPrice}
            </p>
            <Button
              label="Continue"
              onClick={onDelete}
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
    <ReservationCancellationModal
      isOpen={reservationCancellationModal.isOpen}
      title="Rental Cancellation"
      onClose={reservationCancellationModal.onClose}
      body={bodyContent}
      footer={footerContent}
      disabled={disabled}
    />
  );
};

export default ReservationModel;
