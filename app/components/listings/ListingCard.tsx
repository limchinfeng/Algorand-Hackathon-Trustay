"use client";

import { Listing, Reservation } from "@prisma/client";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";

import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div
            className="absolute top-3 right-3
          "
          >
            {/* <HeartButton listingId={data.id} currentUser={currentUser} /> */}
          </div>
        </div>
        <div>
          <div className="font-semibold text-2xl flex justify-between items-center">
              {data.title}
              <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
          <div className="text-sm py-1">
            {data.address}
          </div>

          <div className="font-light text-neutral-500 text-sm">
              {reservationDate || data.category}
          </div>
          <div className="flex flex-row justify-between item-center gap-1 font-light">
            <div className="flex flex-row items-center gap-1">
              <div className="font-semibold text-sm">
                  <div>
                    RM {price}
                  </div>
              </div>
              {!reservation && (
                <div className="font-light text-sm">/ night</div>
              )}
            </div>  
              
              <div>
                {location?.label}
              </div>
          </div>
        </div>
        {onAction && actionLabel && (
          <Button 
          disabled={disabled}
          small
              label={actionLabel}
              onClick={handleCancel}
              />
              )}
      </div>
    </div>
  );
};

export default ListingCard;
