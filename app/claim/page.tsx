'use client';
import React, { useState } from 'react';

export default function Page() {

    // const reportData = [
    //     {
    //         item: "The guest has broken furnitures in the house",
    //         color: "false",

    //     },
    //     {
    //         item: "The guest has unsettled outstanding utilities fee",
    //         color: "false",
    //     },
    //     {
    //         item: "The guest has made the place extremely dirty and hard to clean.",
    //         color: "false",
    //     },
    //     {
    //         item: "The guest has committed crime at the place. ",
    //         color: "false",
    //     },
    //     {
    //         item: "The guest has unsettled outstanding rental.",
    //         color: "false",
    //     },
    // ];
    const [reportData, setReportData] = useState<{ item: string; color: boolean }[]>([
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
        updatedReportData[index].color = updatedReportData[index].color === false ? true : false;
        setReportData(updatedReportData);
    };


    return (

        <div className="mx-20">
            <h1 className="text-2xl font-bold mb-6">Report and Claim</h1>
            <h1 className="text-2xl font-bold mb-6">What has the guest breached?</h1>
            <div>
                {reportData.map((data, index) => {
                    return (
                        <div key={index} className="mb-4 bg-gray-300 flex flex-row items-start">
                            <button onClick={(event) => handleClick(index)} className={`rounded-full my-3 ml-3 pr-2 py-2 px-2  capitalize font-bold text-white  ${(data.color === true) ? 'bg-blue-700' : 'bg-gray-500'}`}>{""}</button>
                            <p className="py-2 pl-5">{data.item}</p>
                        </div>
                    )
                })}
                <div>
                    <p className="text-center"><button className="bg-gray-500 hover:bg-blue-700 text-white font-bold rounded p-2">{"Submit"}</button></p>
                </div>
            </div>

        </div>



    )
}