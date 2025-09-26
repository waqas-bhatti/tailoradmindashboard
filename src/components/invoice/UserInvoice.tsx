'use client'
import React, { useEffect, useRef, useState } from 'react'
import usePagination from '@/hooks/usePagination'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select';
import { SelectItem } from '@radix-ui/react-select';
import { fetchCustomer } from "@/lib/reduxStore/customers/customerSlice";
import {
  useGetCustomersQuery
} from "@/lib/reduxStore/customers/customersApi";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from "@/lib/store";
import useSearchParams from '@/hooks/useSearchParams';
import { useReactToPrint } from "react-to-print";
import InvoicePrint from './InvoicePrint';

// Remove the UserInvoiceProps interface and make component not expect any props
export const UserInvoice: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const { customers, loading, error } = useSelector((state: RootState) => state.customers);
  const {
      data: customers = [],
      isLoading,
      isError,
      error,
    } = useGetCustomersQuery();
  const [currentOrder, setCurrentOrder] = useState<any>(null);

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Order Details",
    onAfterPrint: () => console.log("Printed successfully")
  });
  
  const printOrder = (order: any) => {
    setCurrentOrder(order);
    setTimeout(() => {
      handlePrint();
    }, 100);
  };
    
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await dispatch(fetchCustomer());
  //     } catch (error:any) {
  //       throw new Error("Can't be fetch the User Data", error);
  //     }
  //   }
  //   fetchData();
  // }, [dispatch]);

  const {
    searchText,
    delayedSearchText,
    setSearchText,
    clearSearch,
    triggerSearch,
    isSearching,
  } = useSearchParams(300);
  
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(delayedSearchText.toLowerCase()) ||
      c.number.toString().includes(delayedSearchText.toLowerCase())
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
      <div className="hidden">
        {currentOrder && (
          <div ref={printRef}>
            <InvoicePrint order={currentOrder} />
          </div>
        )}
      </div>
      {/* Header with search */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Customer Invoice</h2>
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchText}
            placeholder="Search by name or order id"
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={((e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                triggerSearch();
              }
            } )}
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
            <th className="px-6 py-3 rounded-tl-lg">Name</th>
            <th className="px-6 py-3">Number</th>
            <th className="px-6 py-3 text-right rounded-tr-lg">Invoice</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={3} className="text-center py-4">Loading...</td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={3} className="text-center text-red-500 py-4">{isError}</td>
            </tr>
          )}
          {currentData.length === 0 && !isLoading && (
            <tr>
              <td colSpan={3} className="text-center py-4">No customers found</td>
            </tr>
          )}
          {currentData.map((c) => (
            <tr
              key={c.id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <td className="px-4 py-3">{c.name}</td>
              <td className="px-4 py-3"> {c.number} </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => printOrder(c)}
                  className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Print
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredCustomers.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          {/* Items per page dropdown */}
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

          {/* Pagination Controls */}
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
  )
}