"use client";
import React, { useEffect, useState } from "react";
import UserHistoryTable from "./UserHistoryTable";
import { CustomerPreviewProps } from "@/lib/data";
import { fetchCustomer } from "@/lib/reduxStore/customers/customerSlice";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import useSearchParams from "@/hooks/useSearchParams";


const UserHistory: React.FC = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((state: RootState) => state.customers);
  console.log("Fetched customers from Redux:", customers);

  const {
  searchText,
  delayedSearchText,
  setSearchText,
  clearSearch,
  triggerSearch,
  isSearching,
} = useSearchParams(300);
  
  useEffect(() => {
    dispatch(fetchCustomer() as any )
  },[dispatch] )


  return (
    <div>
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-blue-800 font-bold">CUSTOMER HISTORY</h2>
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchText}
              placeholder="Search by name or order id"
              onChange={(e) => setSearchText(e.target.value) }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  triggerSearch();
                }
              }}
              className="p-2 border border-amber-300 rounded w-64"
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
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

        {/* Table */}
        <div className="overflow-x-auto rounded-sm ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 rounded-lg">
            <thead className="bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white text-sm uppercase tracking-wider">
              <tr >
                <th className="px-6 py-3 text-left text-base font-semibold text-gray-900 rounded-tl-lg">
                  Suit No
                </th>
                <th className="px-6 py-3 text-left text-base font-semibold text-gray-900">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-base font-semibold text-gray-900 rounded-tr-lg">
                  Number
                </th>
                <th className="px-6 py-3 text-left text-base font-semibold text-gray-900 rounded-tr-lg">
                  Last Activety
                </th>
              </tr>
            </thead>

           <UserHistoryTable customer={customers} searchText={delayedSearchText} />


          </table>
        </div>
      </div>
    </div>
  );
};

export default UserHistory;
