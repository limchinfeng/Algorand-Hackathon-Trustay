"use client";

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const {getByValue} = useCountries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return 'Anywhere';
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if(startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);
      
      if(diff === 0) {
        diff = 1
      }

      return `${diff} Days`
    }

    return 'Any Week'
  }, [startDate, endDate]);
  
  const guestLabel = useMemo(() => {
    if(guestCount) {
      return `${guestCount} Guests`;
    }

    return 'Add Guests';
  }, [guestCount]);

  return (
    <>
      <div
        onClick={searchModal.onOpen}
        className="flex flex-row justify-center items-center mx-auto border-[1px] md:w-auto py-2 rounded-3xl shadow-sm
        hover:shadow-md transition cursor-pointer border-black p-5 px-3 gap-5"
        >
            <div className="p-1 rounded-full text-black">
              <BiSearch size={18} />
            </div>
            <div className="pr-2 text-black/90">
              Search for property...
            </div>
      </div>
      <div className="flex flex-row item-center justify-between text-center hidden">
        <div className="flex items-center justify-center text-sm font-semibold px-6">
          {locationLabel}
        </div>

        <div className="hidden sm:flex sm:flex-col sm:items-center sm:justify-center text-sm font-semibold px-6 border-x-[1px] flex-1 items-center justify-center">
          {durationLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-grey-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-1 bg-rose-500 rounded-full text-white">
            {/* <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-lg"/> */}
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
