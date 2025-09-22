'use client'
import React, { useState } from 'react';
import { previewFields } from "@/lib/data";
import {User} from "@/types/customerTypes"
import usePagination from '@/hooks/usePagination';
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


interface UserHistoryTableProps {
  customer: User[];
  searchText: string;
}

const UserHistoryTable: React.FC<UserHistoryTableProps> = ({ customer, searchText }) => {
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [openOrders, setOpenOrders] = useState<{ [key: string]: boolean }>({});
  
  
  const toggleRow = (id: string) => {
    setOpenRow(openRow === id ? null : id);
  };

  const toggleOrder = (orderId: number) => {
    const key = orderId.toString();
    setOpenOrders((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCustomers = customer.filter(
  (entry) =>
    entry.name.toLowerCase().includes(searchText.toLowerCase()) ||
    entry.number.toString().includes(searchText.toLowerCase())
);

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
  const aId = Number(a.order_id ?? a.id) || 0;
  const bId = Number(b.order_id ?? b.id) || 0;
  return bId - aId;
});

  const groupedCustomers = sortedCustomers.reduce((acc: any, curr) => {
    const id = curr.customers_id as string;
    if (!acc[id]) {
      acc[id] = {
        ...curr,
        orders: [],
      };
    }
    acc[id].orders.push(curr);
    return acc;
  }, {});

  const groupedList = Object.values(groupedCustomers);

   groupedList.sort((a: any, b: any) => {
    const aLatestOrder = a.orders[0]; 
    const bLatestOrder = b.orders[0];
    return (bLatestOrder.order_id || bLatestOrder.id) - (aLatestOrder.order_id || aLatestOrder.id);
    
  });
  // -------------------Apply pagination---------------
  const {
  currentData,
  currentPage,
  totalPages,
  itemsPerPage,
  setCurrentPage,
  setItemsPerPage,
} = usePagination(groupedList, 5);

  return (
    <>
      <tbody className="divide-y border divide-gray-200">
      {currentData.map((entry: any) => (
        <React.Fragment key={entry.customers_id}>
          {/* Main Row */}
          <tr
            className="border-b dark:border-gray-600"
            onClick={() => toggleRow(entry.customers_id)}
          >
            <td className="px-6 py-4 text-sm md:text-base font-medium flex items-center space-x-2">
              <span
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenRow(openRow === entry.customers_id ? null : entry.customers_id);
                }}
              >
                {openRow === entry.customers_id ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                       fill="currentColor" className="w-5 h-5 text-orange-600">
                    <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                       fill="currentColor" className="w-5 h-5 text-green-600">
                    <path d="M8.75 3.75a.75.75 0 0 0-1.5 
                          0v3.5h-3.5a.75.75 0 0 0 0 
                          1.5h3.5v3.5a.75.75 0 0 0 
                          1.5 0v-3.5h3.5a.75.75 0 0 
                          0 0-1.5h-3.5v-3.5Z" />
                  </svg>
                )}
              </span>
              {entry.orders.length} suits
            </td>
            <td className="px-6 py-4 text-sm md:text-base font-medium">
              {entry.name}
            </td>
            <td className="px-6 py-4 text-sm md:text-base ">
              {entry.number}
            </td>
            <td className="px-6 py-4 text-sm md:text-base ">
              {entry.created_at}
            </td>
          </tr>

          {/* Expanded Row */}
          {openRow === entry.customers_id && (
            <tr className="bg-gray-50">
              <td colSpan={4} className="px-6 py-4 text-gray-600 text-sm">
                {/* User Info Section */}
                <div className="mb-6 p-4 border rounded bg-white shadow-sm">
                  <h3 className="font-medium text-lg text-gray-900">Customer Information</h3>
                  <p><strong>Name:</strong> {entry.name}</p>
                  <p><strong>Number:</strong> {entry.number}</p>
                  <p><strong>Address:</strong> {entry.address || 'N/A'}</p>
                </div>

                {/* Orders Stepper */}
                <ol className="relative border-s border-green-300 text-gray-500">
                  {entry.orders.map((order: any, orderIndex: number) => (
                    <li key={order.order_id} className="mb-10 ms-6">
                      <span
                        className="absolute flex items-center justify-center w-8 h-8 
                          bg-green-300 rounded-full -start-4 ring-4 ring-white cursor-pointer"
                        onClick={() => toggleOrder(order.order_id)}
                      >
                        {orderIndex + 1}
                      </span>
                      <div className="flex items-center justify-between">
                        <h3
                          className="font-medium leading-tight cursor-pointer"
                          onClick={() => toggleOrder(order.order_id)}
                        >
                          Order #{orderIndex + 1} — <span className={`px-2 py-1 rounded text-white ${order.status === "complete" ? "bg-green-500" : order.status === "is_preparing" ? "bg-yellow-500" : "bg-red-500"}`}>{order.status}</span>
                        </h3>
                      </div>
                      {openOrders[order.order_id.toString()] && (
                        <div className="p-4 border rounded bg-white shadow-sm mt-3">
                          <p><strong>Kameez Length:</strong> {order.kameez_length}</p>
                          <p><strong>Salwar Length:</strong> {order.salwar_length}</p>
                          <p><strong>Suit Style:</strong> {order.suit_style}</p>
                          <p><strong>Chest:</strong> {order.chest}</p>
                          <p><strong>Waist:</strong> {order.waist}</p>
                          <p><strong>Shoulder:</strong> {order.shoulder}</p>
                          <p><strong>Asteen:</strong> {order.asteen}</p>
                          <p><strong>Collar Style:</strong> {order.collarstyle}</p>
                          <p><strong>Bottom Width:</strong> {order.bottomwidth}</p>
                          <p><strong>Salwar Type:</strong> {order.salwartype}</p>
                          <p><strong>Color:</strong> {order.color}</p>
                          <p><strong>Payment:</strong> {order.payment}</p>
                          <p><strong>Cloths Number:</strong> {order.clothsquantity}</p>
                          <p><strong>Basic Price:</strong> {order.basicPrice}</p>
                          <p><strong>Total Bill:</strong> {order.totalBill}</p>
                          <p><strong>Delivery:</strong> {order.delivery}</p>
                          <p><strong>Status:</strong> {order.status}</p>
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </td>
            </tr>
          )}
        </React.Fragment>
      ))}
      </tbody>
      
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

    {/* Pagination */}
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

    </>
   
  );
};

export default UserHistoryTable;