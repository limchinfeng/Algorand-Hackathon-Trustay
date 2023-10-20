"use client";

import { useState } from "react";


export default function Card() {
    const [votingData, setvotingData] = useState<{ photo: string; title: string; desc: string }[]>
        ([
            {
                photo: "/images/brokenFurniture.jpg",
                title: " Guest's Unfortunate Mishap Results in Damaged Furniture at Host's Home",
                desc: "The concept of sharing one's home with guests or tenants has gained immense popularity in recent years,......",
            },
            {
                photo: "/images/dirtyKitchen.jpg",
                title: "Dirty Kitchen Dilemma: Tackling Hygiene Concerns in the Heart of the Home",
                desc: "In countless households, maintaining a spotless kitchen remains a formidable challenge,......",
            },
            {
                photo: "/images/conflict.jpg",
                title: "Navigating Unsettled Rental Payments - A Landlord and Tenant Conundrum",
                desc: "The economic landscape has seen its share of changes over the years,......",
            },
        ]);
    return (

        <div className='border-primary border p-4 rounded-lg h-full'>
            {votingData.map((voting, index) => {
                return (
                    <div key="index" className=''>
                        <div className=''>
                            <img src={voting.photo} alt="photoCover" />
                        </div>
                        <div className='mb-4'>
                            <h1 className="text-l font-extrabold ">{voting.title}</h1>
                            <p className="text-sm">{voting.desc}</p>
                            <p className="text-center"><button className="bg-zinc-300 p-1 w-full rounded-lg hover:bg-primary font-light font-base" >View More to Vote</button></p>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}
