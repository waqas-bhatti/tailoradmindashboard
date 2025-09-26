"use client"; 
import React, { useEffect, useState } from "react";
import UserHistoryTable from "./UserHistoryTable";
import { CustomerPreviewProps } from "@/lib/data";
import { fetchCustomer } from "@/lib/reduxStore/customers/customerSlice";
import { useGetCustomersQuery } from "@/lib/reduxStore/customers/customersApi";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import useSearchParams from "@/hooks/useSearchParams";

const UserHistory: React.FC = () => {
  const {
    data: customers = [],
    isLoading,
    isError,
    error,
  } = useGetCustomersQuery();
  
  const totalCustomers = customers.length;
  const totalOrders = new Set(customers.map((c) => c.number)).size;

  const {
    searchText,
    delayedSearchText,
    setSearchText,
    clearSearch,
    triggerSearch,
    isSearching,
  } = useSearchParams(300);

  return (
    <>
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-blue-800 font-bold">CUSTOMER HISTORY</h2>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Total Customers : [{totalOrders} Order of {totalCustomers} Customer]
            </h2>
          </div>
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchText}
              placeholder="Search by name or order id"
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  triggerSearch();
                }
              }}
              className="p-2 border border-amber-300 rounded w-64 dark:bg-gray-700 dark:text-white dark:border-gray-600"
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
        </div>
        
        {/* Error/Loading states */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading...</span>
          </div>
        )}
        
        {isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error loading customers. Please try again.
          </div>
        )}

        {/* Table Component */}
        <UserHistoryTable customer={customers} searchText={delayedSearchText} />
      </div>
    </>
  );
};

export default UserHistory;