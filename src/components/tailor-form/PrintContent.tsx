'use client'
import React from "react";

const PrintContent = React.forwardRef<HTMLDivElement, { order: any }>(
  ({ order }, ref) => {
    return (
      <div ref={ref} className="p-4" style={{ fontFamily: "Arial, sans-serif" }}>
        <h2>Customer Cloth Details</h2>
        <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "5px" }}>
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Number:</strong> {order.number}</p>
          <p><strong>Address:</strong> {order.address || "N/A"}</p>
          <p><strong>Kameez Length:</strong> {order.kameez_length || "N/A"}</p>
          <p><strong>Salwar Length:</strong> {order.salwar_length || "N/A"}</p>
          <p><strong>Suit Style:</strong> {order.suit_style || "N/A"}</p>
          <p><strong>Neck Size:</strong> {order.neck_size || "N/A"}</p>
          <p><strong>Chest:</strong> {order.chest || "N/A"}</p>
          <p><strong>Waist:</strong> {order.waist || "N/A"}</p>
          <p><strong>Shoulder:</strong> {order.shoulder || "N/A"}</p>
          <p><strong>Asteen:</strong> {order.asteen || "N/A"}</p>
          <p><strong>Collar Style:</strong> {order.collarstyle || "N/A"}</p>
          <p><strong>Bottom Width:</strong> {order.bottomwidth || "N/A"}</p>
          <p><strong>Salwar Type:</strong> {order.salwartype || "N/A"}</p>
          <p><strong>Color:</strong> {order.color || "N/A"}</p>
          <p><strong>Payment:</strong> {order.payment || "N/A"}</p>
          <p><strong>Cloths Number:</strong> {order.clothsquantity || "N/A"}</p>
          <p><strong>Basic Price:</strong> {order.basicPrice || "N/A"}</p>
          <p><strong>Total Bill:</strong> {order.totalBill || "N/A"}</p>
          <p><strong>Delivery:</strong> {order.delivery || "N/A"}</p>
          <p><strong>Status:</strong> {order.status || "N/A"}</p>
        </div>
      </div>
    );
  }
);

PrintContent.displayName = "PrintContent";

export default PrintContent;