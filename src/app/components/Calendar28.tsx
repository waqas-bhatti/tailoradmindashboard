"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, isAfter, isEqual, startOfDay } from "date-fns"; 

interface Calendar28Props {
  value: Date | string | null; // Allow string input for flexibility
  onChange: (date: Date | null) => void;
}

function formatDate(date: Date | string | null) {
  if (!date) return "";
  const dateObj = typeof date === "string" ? new Date(date + "T00:00:00") : date;
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) return "";
  // Format date in PKT without time zone shift
  const year = dateObj.getFullYear();
  const month = dateObj.toLocaleString("en-US", { month: "long", timeZone: "Asia/Karachi" });
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${month} ${day}, ${year}`;
}

export function Calendar28({ value, onChange }: Calendar28Props) {
  const [open, setOpen] = React.useState(false);
  const normalizedValue = value
    ? typeof value === "string"
      ? new Date(value)
      : value
    : undefined;
  // Set initial month to the selected date or today
  const [month, setMonth] = React.useState<Date>(
    normalizedValue && !isNaN(normalizedValue.getTime())
      ? normalizedValue
      : startOfDay(new Date())
  );

  const today = startOfDay(new Date()) // Normalize to start of day

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={formatDate(value)}
          placeholder="Select Date"
          className="bg-background pr-10"
          onChange={(e) => {
            const d = new Date(e.target.value);
            if (!isNaN(d.getTime()) && d >= today) {
              onChange(d);
              setMonth(d);
            } else {
              onChange(null);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={normalizedValue}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(d) => {
                if (d && d >= today) {
                  onChange(d);
                  setOpen(false);
                }
              }}
              // disabled={(date) => date < today} // Disable past dates
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}