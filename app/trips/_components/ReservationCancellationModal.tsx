"use client";

interface ModelProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
}

import Button from "@/app/components/Button";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const ReservationCancellationModal: React.FC<ModelProps> = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  disabled,
}) => {
  const [showModal, setShowModel] = useState(isOpen);

  useEffect(() => {
    setShowModel(isOpen);
  }, [isOpen]);

  const handelClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModel(false);
    setTimeout(() => {
      onClose();
    }, 100);
  }, [disabled, onClose]);


  if (!isOpen) {
    return null;
  }
  
  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-hidden
        fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
      >
        <div
          className="relative w-full md:w-[90%] my-6 mx-auto
            h-full lg:h-auto md:h-auto"
        >
          {/* CONTENT */}
          <div
            className={`duration-300 h-full 
                ${showModal ? "translate-y-0" : "translate-y-full"}
                ${showModal ? "opacity-100" : "opacity-0"}
                `}
          >
            <div
              className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg
                    shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
            >
              {/*  HEADER */}
              <div
                className="flex items-center p-6 rounded-t justify-center relative 
                        border-b-[1px]"
              >
                <button
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                  onClick={handelClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-4xl font-extrabold">{title}</div>
              </div>

              {/* BODY */}
              <div className="relative p-6 flex flex-col items-center justify-center w-4/5 mx-auto">
                {body}
              </div>

              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-2 pt-2">
                {/* <div className="flex flex-row items-center gap-4 w-full">
                  <Button disabled={disabled} label={actionLabel} onClick={handleSubmit}/>
                </div> */}
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationCancellationModal;
