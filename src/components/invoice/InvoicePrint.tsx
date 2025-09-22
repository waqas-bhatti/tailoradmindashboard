"use client";
import React from "react";

const InvoicePrint = React.forwardRef<HTMLDivElement, { order: any }>(
  ({ order }, ref) => {
    return (
      <div
        ref={ref}
        className="invoice-container max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Tailorix</h1>
            <p className="text-sm text-gray-500">Custom Tailoring & Alterations</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold text-gray-700">INVOICE</h2>
            <p className="text-sm text-gray-500">{order.number}</p>
            <p className="text-sm text-gray-500">{ order.created_at}</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Bill To:</h3>
            <p className="text-gray-600">{ order.name}</p>
            <p className="text-gray-600">{ order.address}</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">Item</th>
                <th className="border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">Qty</th>
                <th className="border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">Rate</th>
                <th className="border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 text-gray-600">{ order.suit_style}</td>
                <td className="border px-4 py-2 text-gray-600 text-center">{ order.clothsquantity}</td>
                <td className="border px-4 py-2 text-gray-600 text-right">{ order.basicPrice}</td>
                <td className="border px-4 py-2 text-gray-600 text-right">{ order.totalBill}</td>
              </tr>
              
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mt-6">
          <div className="w-1/2">
            <div className="flex justify-between py-2 border-b">
              <span className="font-semibold text-gray-700">Subtotal:</span>
              <span className="text-gray-600">{ order.totalBill}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-semibold text-gray-700">Tax (10%):</span>
              <span className="text-gray-600">$28.50</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-bold text-gray-800">Total:</span>
              <span className="font-bold text-gray-800">{ order.totalBill}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

InvoicePrint.displayName = "InvoicePrint";
export default InvoicePrint;
