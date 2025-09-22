"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { restoreCustomer, fetchCustomer } from "@/lib/reduxStore/customers/customerSlice";
import usePagination from "@/hooks/usePagination";
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select';
import { SelectItem } from '@radix-ui/react-select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import useSearchParams from "@/hooks/useSearchParams";

const DeleteData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { trashed, loading, error } = useSelector((state: RootState) => state.customers);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchCustomer());
  }, [dispatch]);

  const handleRestore = async (id: string) => {
    try {
      setIsSubmitting(true);
      await dispatch(restoreCustomer(id)).unwrap();
    } catch (error) {
      console.error("Failed to restore customer:", error);
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

  // filter deleted customers based on search
  const filteredCustomers = trashed.filter((customer) =>
    customer.name.toLowerCase().includes(delayedSearchText.toLowerCase()) ||
    customer.number.toString().includes(delayedSearchText.toLowerCase())
  );

  const {
    currentData,
    currentPage,
    totalPages,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
  } = usePagination(filteredCustomers, 5);

  return (
    <div className="overflow-x-auto p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
      {/* Header with search */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Delete History</h2>
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search by name or order id"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={((e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                triggerSearch();
              }
            } ) }
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

      {/* Table */}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <thead className="bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white text-sm uppercase tracking-wider">
          <tr>
            <th className="px-6 py-3 rounded-tl-lg">Cloth No</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Number</th>
            <th className="px-6 py-3 text-right rounded-tr-lg">Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-3 text-center text-gray-500">
                No deleted customers.
              </td>
            </tr>
          ) : (
            currentData.map((customer) => (
              <tr
                key={customer.id}
                className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {customer.clothsquantity}
                </td>
                <td className="px-4 py-3">{customer.name}</td>
                <td className="px-4 py-3">{customer.number}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleRestore(customer.id)}
                      disabled={isSubmitting}
                      className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {isSubmitting ? "Restoring..." : "Restore"}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {filteredCustomers.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          {/* Rows per page */}
          <Select
            value={String(itemsPerPage)}
            onValueChange={(val) => {
              setItemsPerPage(Number(val));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Rows per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>

          {/* Page navigation */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default DeleteData;
