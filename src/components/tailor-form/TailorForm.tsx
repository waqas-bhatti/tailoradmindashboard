// components/TailorForm.tsx
"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CrudForm from "./CrudForm";
import FormData from "./FormData";
import { Calendar28 } from "@/app/components/Calendar28";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { addCustomer, fetchCustomer } from "@/lib/reduxStore/customers/customerSlice";
import {
  useGetCustomersQuery,
  useAddCustomerMutation,
} from "@/lib/reduxStore/customers/customersApi";
import { z } from "zod";
import { userDetailSchema } from "@/app/schemas/AddNewSchema";
import type { AppDispatch } from "@/lib/store";
import useSearchParams from '@/hooks/useSearchParams';
const TailorForm = () => {
  // const dispatch = useDispatch<AppDispatch>();

  const {
      data: customers = [],
      isLoading,
      isError,
      error,
  } = useGetCustomersQuery();
  const [addCustomer] = useAddCustomerMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Search filter states
  const [selectDay, setSelecthDay] = useState("");
  const [selectDate, setSelectDate] = useState<Date | null>(null); // Allow null
  const [selectStatus, setSelectStatus] = useState("");

  const toggleAccordion = () => setIsOpen((prev) => !prev);

  const handleSubmit = async (data: z.infer<typeof userDetailSchema>) => {
  try {
    setIsSubmitting(true);
    setSubmitError(null);

    const finalData = {
      ...data,
    };

    await addCustomer(finalData).unwrap();
    setIsOpen(false);
  } catch (err: any) {
    setSubmitError(err.message || "Failed to add customer.");
  } finally {
    setIsSubmitting(false);
  }
};

  const {
      searchText,
      delayedSearchText,
      setSearchText,
      clearSearch,
      triggerSearch,
      isSearching,
    } = useSearchParams(300);
  
  
  // Clear filter and search input
  const handleClearFilter = () => {
    setSearchText("");
    setSelectDate(null);
    setSelecthDay("");
    setSelectStatus("");
    triggerSearch();
  };

  // Alternative date input handler (if Calendar28 is removed)
  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value ? new Date(e.target.value) : null;
    if (dateValue && !isNaN(dateValue.getTime())) {
      setSelectDate(dateValue);
    } else {
      setSelectDate(null);
    }
  };

  return (
    <section className="dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 pb-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="🔍 Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    triggerSearch();
                  }
                }}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded pr-10"
              />
              {searchText && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
            <Select value={selectDay} onValueChange={(val) => setSelecthDay(val)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Days" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Days</SelectLabel>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Monthly</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* Date selection */}
            <div>
              {/* Replace or comment out Calendar28 for testing */}
              <Calendar28
                value={selectDate}
                onChange={(date) => setSelectDate(date)}
              />
              {/* Alternative date input (uncomment to use instead of Calendar28) */}
              {/* <input
                type="date"
                value={selectDate ? selectDate.toISOString().split("T")[0] : ""}
                onChange={handleDateInputChange}
                className="w-[180px] px-4 py-2 text-sm border border-gray-300 rounded"
              /> */}
            </div>
            {/* Fixed Status Select */}
            <Select value={selectStatus} onValueChange={(val) => setSelectStatus(val)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>All Status</SelectLabel>
                  <SelectItem value="pending">Pending</SelectItem>
                  {/* <SelectItem value="preparing">In Preparing</SelectItem> */}
                  <SelectItem value="complete">Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={toggleAccordion}
              className="relative inline-flex items-center justify-center px-4 py-2.5 overflow-hidden font-medium text-white rounded-sm shadow-lg group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-[spin_3s_linear_infinite] blur-lg opacity-75"></span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded"></span>
              <span className="relative flex items-center">
                {isOpen ? (
                  <svg
                    className="h-6 w-6 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4 mr-2 transform rotate-0 group-hover:rotate-90"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                )}
                {!isOpen && <span>Add Data</span>}
              </span>
            </button>
          </div>
          {/* Clear Filter Button */}
          <Button onClick={handleClearFilter}>Clear</Button>
        </div>
        <div
          className={`transition-all duration-500 overflow-hidden ${
            isOpen ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 mt-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Create New Tailor Entry
            </h3>
            <FormData
                  onClose={() => setIsOpen(false)}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                
                />
            
            {submitError && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                {submitError}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mt-4 bg-white rounded-lg shadow dark:bg-gray-800 p-4 z-99999">
        <CrudForm
          searchText={searchText}
          selectDay={selectDay}
          selectDate={selectDate}
          status={selectStatus}
          delayedSearchText={delayedSearchText}
        />
      </div>
    </section>
  );
};

export default TailorForm;