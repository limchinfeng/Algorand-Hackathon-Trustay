"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ImageUploading, { ImageListType } from "react-images-uploading";
import useProfileModal from "../hooks/useProfileModal";
import Button from "../components/Button";

export default function ClaimReport() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const profileModal = useProfileModal();

  const [reportData, setReportData] = useState<{ item: string; color: boolean }[]>
  ([
    {
      item: "The guest has broken furnitures in the house",
      color: false,
    },
    {
      item: "The guest has unsettled outstanding utilities fee",
      color: false,
    },
    {
      item: "The guest has made the place extremely dirty and hard to clean.",
      color: false,
    },
    {
      item: "The guest has committed crime at the place. ",
      color: false,
    },
    {
      item: "The guest has unsettled outstanding rental.",
      color: false,
    },
  ]);

  const handleClick = (index: number) => {
    const updatedReportData = [...reportData];
    updatedReportData[index].color =
      updatedReportData[index].color === false ? true : false;
    setReportData(updatedReportData);
  };

  const maxNumber = 69;
  const [images, setImages] = useState([]);
  const [action, setAction] = useState<{ item: string; color: boolean }[]>
  ([
    {
      item: "The damage is mild and repairable. I would like to retain the deposit for repair purpose ",
      color: false,
    },
    {
      item: "The damage is serious and not repairable. I would to retain the deposit to purchase new and replace.    ",
      color: false,
    },
  ]);

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  const handleClick2 = (index: number) => {
    const updatedAction = [...action];
    updatedAction[index].color =
      updatedAction[index].color === false ? true : false;
    setAction(updatedAction);
  };

  const onSubmit = (data: string) => {
        setIsLoading(true);

        axios.post('/api/reports', data)
        .then(() => {
            toast.success('Report Created!');
            router.refresh();
            router.push("/");
            setTimeout(() => {
              profileModal.onOpen();
            }, 2000);
        })
        .catch(() => {
            toast.error('Something went wrong');
        }).finally(() => {
            setIsLoading(false);
        })
    }


  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div className="mx-20">
        <h1 className="text-4xl font-extrabold mb-6">Report and Claim</h1>
        <h1 className="text-3xl font-extrabold mb-6">
          What has the guest breached?
        </h1>
        <div>
          {reportData.map((data, index) => {
            return (
              <div
                key={index}
                className="mb-4 bg-gray-300 flex flex-row items-start"
              >
                <button
                  onClick={(e) => handleClick(index)}
                  className={`rounded-full my-3 ml-3 pr-2 py-2 px-2  capitalize font-bold text-white  ${
                    data.color === true ? "bg-primary" : "bg-gray-100"
                  }`}
                >
                  {""}
                </button>
                <p className="py-2 pl-5">{data.item}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-20 mt-20">
        <h1 className="text-3xl font-extrabold mb-6">
          The guest has broken furnitures in the house...
        </h1>
        <div>
          <div>
            <h3>Please select the broken furniture in your house:</h3>
            <select
              name="furniture"
              id="broken furniture"
              className="block w-full p-1 text-black-900 border border-black-300 rounded-lg bg-gray-100 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-black-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="redsofa">Red Sofa (250x90x110)</option>
              <option value="television">Television</option>
              <option value="windows">Windows</option>
              <option value="cabinet">Cabinet</option>
            </select>
          </div>
          <div>
            <h3>Please upload supporting evidences for community voting:</h3>
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
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
                  <button
                    className={`bg-zinc-300 p-2 rounded-lg mr-5 hover:bg-primary ${
                      isDragging ? "bg-red-500" : undefined
                    }`}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Click or Drop here
                  </button>
                  &nbsp;
                  <button
                    className="bg-zinc-300 p-2 rounded-lg hover:bg-primary "
                    onClick={onImageRemoveAll}
                  >
                    Remove all images
                  </button>
                  {imageList.map((image, index) => (
                    <div key={index} className="flex flex-row m-3">
                      <img src={image.dataURL} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <button
                          className="bg-zinc-300 p-1 rounded-lg mr-3 hover:bg-primary font-light font-base"
                          onClick={() => onImageUpdate(index)}
                        >
                          Update
                        </button>
                        <button
                          className="bg-zinc-300 p-1 rounded-lg mr-3 hover:bg-primary font-light font-base"
                          onClick={() => onImageRemove(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </div>
          <div>
            <h3>
              Please describe the incidents for community voting (max 500
              characters):
            </h3>
            <label
              htmlFor="large-input"
              className="block mb-2 text-sm font-medium text-black-900 dark:text-white"
            >
              {""}
            </label>
            <input
              type="text"
              id="large-input"
              className="block w-full p-4 text-black-900 border border-black-300 rounded-lg bg-gray-100 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-black-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></input>
          </div>
          <div>
            <h3>Actions available from the smart contract:</h3>
            {action.map((data, index) => {
              return (
                <div
                  key={index}
                  className="mb-4 bg-gray-300 flex flex-row items-start"
                >
                  <button
                    onClick={(e) => handleClick2(index)}
                    className={`rounded-full my-3 ml-3 pr-2 py-2 px-2  capitalize font-bold text-white  ${
                      data.color === true ? "bg-primary" : "bg-gray-100"
                    }`}
                  >
                    {""}
                  </button>
                  <p className="py-2 pl-5">{data.item}</p>
                </div>
              );
            })}
          </div>
          <div className="my-6">
            <Button 
              label="Submit"
              onClick={() => onSubmit("")}
              disabled={isLoading}
              outline
            />
              
            <p className="text-center text-red-500 mt-3">
              Please note that you are unable to cash out the deposit but to
              purchase the relevant services directly only.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
