import React from 'react'

export default function page() {
    const reportData = [
        {
            item: "The guest has broken furnitures in the house",

        },
        {
            item: "The guest has unsettled outstanding utilities fee",

        },
        {
            item: "The guest has made the place extremely dirty and hard to clean.",

        },
        {
            item: "The guest has committed crime at the place. ",

        },
        {
            item: "The guest has unsettled outstanding rental.",

        },
    ];

    return (
        <div className="mx-50px">
            <h1 className="text-2xl font-bold ">Report and Claim</h1>
            <h1 className="text-2xl font-bold ">What has the guest breached?</h1>
            <div>
                {reportData.map((data, index) => {
                    return (
                        <div key={index} className="">
                            {data.item}
                        </div>
                    )
                })}
            </div>

        </div>



    )
}

