'use client';

import { format } from 'date-fns';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import PopOver from './popover';
import Button from './button';

interface Props {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export default function DatePickerPopover({ date, setDate }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <PopOver
        isOpen={isOpen}
        setIsopen={setIsOpen}
        trigger={
          <Button variant="outline">
            {date ? format(date, 'PP') : 'Select Date'}
          </Button>
        }
        content={
          <DayPicker
            mode="single"
            disabled={{ before: new Date() }}
            selected={date}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                setDate(selectedDate);
                setIsOpen(false);
              }
            }}
            classNames={{
              selected: 'bg-primary text-white rounded-md font-bold',
              today: 'font-bold bg-background rounded-md',
              chevron: 'fill-primary',
            }}
          />
        }
        side="top"
        align="center"
      />
    </>
  );
}
