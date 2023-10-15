'use client';

import React from 'react'
import { DateRange, Range, RangeKeyDict } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface TripCalendarProps {
    value: Range;
    onChange: (value: RangeKeyDict) => void;
    reservedDates?: Date[]
}

const TripCalender: React.FC<TripCalendarProps> = ({
    value, onChange, reservedDates
}) => {
  return (
    <DateRange 
      rangeColors={["#55806C"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction='vertical'
      showDateDisplay={false}
      minDate={new Date}
    />
  );
}

export default TripCalender