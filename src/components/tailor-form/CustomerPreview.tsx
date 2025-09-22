"use client";
import React from "react";
import type { User } from "@/types/customerTypes";
import { CustomerPreviewProps, previewFields } from "@/lib/data";

const CustomerPreview: React.FC<CustomerPreviewProps> = ({ customer, onClose }) => {
  return (
    <div className="p-4">
      <div className="rounded-lg border p-6 shadow-lg w-full">
        <h3 className="text-xl font-semibold mb-4 text-center">Customer Preview</h3>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {previewFields.map(({ label, value }) => (
            <p key={value}>
              <strong>{label}:</strong>{" "}
              {customer[value] ?? "N/A"}
            </p>
          ))}
        </div>
        {/* Add the Close button here */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerPreview;
