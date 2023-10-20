"use client";

import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../Button";

export default function Card() {
  const router = useRouter();

  const [votingData, setvotingData] = useState<
    { photo: string; title: string; desc: string }[]
  >([
    {
      photo: "/images/brokenFurniture.jpg",
      title:
        " Guest's Unfortunate Mishap Results in Damaged Furniture at Host's Home",
      desc: "The concept of sharing one's home with guests or tenants has gained immense popularity in recent years,......",
    },
    {
      photo: "/images/dirtyKitchen.jpg",
      title:
        "Dirty Kitchen Dilemma: Tackling Hygiene Concerns in the Heart of the Home",
      desc: "In countless households, maintaining a spotless kitchen remains a formidable challenge,......",
    },
    {
      photo: "/images/conflict.jpg",
      title:
        "Navigating Unsettled Rental Payments - A Landlord and Tenant Conundrum",
      desc: "The economic landscape has seen its share of changes over the years,......",
    },
  ]);
  return (
    <div className="border-primary border p-4 rounded-lg h-full flex flex-col gap-8">
      {votingData.map((voting) => (
        <div 
            key={voting.photo}
            className="flex flex-col gap-2 group" 
        >
            <div className="overflow-hidden rounded-xl">
                <img 
                    src={voting.photo} 
                    alt="photoCover"
                    className="rounded-lg group-hover:scale-110 transition "
                />
            </div>
            <div className="flex flex-col gap-1 text-justify">
                <h1 className="text-l font-extrabold">
                    {voting.title}
                </h1>
                <p className="text-sm">
                    {voting.desc}
                </p>
                <Button 
                    label= "View More"
                    onClick={() => router.push("/voting")}                    
                    small
                    outline
                />
            </div>
        </div>
      ))}
    </div>
  );
}
