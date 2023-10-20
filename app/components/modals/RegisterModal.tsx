"use client";

import React, { useCallback, useState } from "react";
import axios from "axios";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Button from "../Button";
import Image from "next/image";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      ic: "",
      password: "",
    },
  });

  const [images, setImages] = useState([]);
  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
    .then(() => {
      toast.success('Registered!');
      registerModal.onClose();
      loginModal.onOpen();
    })
    .catch((error) => {
      toast.error(error);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Trustay"
        subtitle="Create an account!"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="ic"
        label="IC"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={1}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="">
           {imageList.length === 0 ? <>
            <div className="w-32">
              <Button 
                label="Upload IC"
                onClick={onImageUpload}
                outline          
              />
            </div>
          </> : <>
            {imageList.map((image, index) => (
              <div key={index} className="flex flex-row m-3">
                <Image src={image.dataURL || ""} alt="" width="50" />
                <div className="image-item__btn-wrapper ml-5 flex flex-row w-64 gap-5 h-10 items-center justify-center ">
                  <Button 
                    label="Update"
                    onClick={() => onImageUpdate(index)}
                    outline
                  />
                  <Button 
                    label="Remove"
                    onClick={() => onImageRemove(index)}
                    outline                  
                  />
                </div>
              </div>
            ))}
          </> } 

          </div>
        )}
      </ImageUploading>
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-1">
      <hr />
      <div className="text-neutral-500 text-center font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>
            Already have an account?
          </div>
          <div 
          onClick={toggle}
          className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
