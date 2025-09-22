import z from "zod";
import { userDetailSchema } from "@/app/schemas/AddNewSchema";

type FormData = z.infer<typeof userDetailSchema>;

export interface FormField {
  name: keyof FormData;
  labelEn: string;
  labelUr: string;
  placeholder?: string;
  type?: "text" | "select" | "date" | "selectOrText";
  options?: { value: string; labelEn: string; labelUr: string }[]; // Options for select fields
}

// ✅ 1st Section: Personal Information
export const personalInfoFields: FormField[] = [
  {
    name: "name",
    labelEn: "Name",
    labelUr: "صارف کا نام",
    placeholder: "Enter username",
    type: "text",
  },
  {
    name: "number",
    labelEn: "Number",
    labelUr: "نمبر",
    placeholder: "Enter number",
    type: "text",
  },
  {
    name: "address",
    labelEn: "Address",
    labelUr: "پتہ",
    placeholder: "Enter Address",
    type: "text",
  },
];

// ✅ 2nd Section: Clothes Details
export const clothesDetailFields: FormField[] = [
  {
    name: "suit_style",
    labelEn: "Suit Style",
    labelUr: "سوٹ کا انداز",
    placeholder: "Select Suit Style",
    type: "select",
    options: [
      {
        value: "Shalwar Kameez",
        labelEn: "Shalwar Kameez",
        labelUr: "شلوار قمیض",
      },
      { value: "Sherwani", labelEn: "Sherwani", labelUr: "شیروانی" },
      {
        value: "Kurta Pajama",
        labelEn: "Kurta Pajama",
        labelUr: "کرتا پاجامہ",
      },
      { value: "Pathani Suit", labelEn: "Pathani Suit", labelUr: "پٹھانی سوٹ" },
      {
        value: "Waistcoat Suit",
        labelEn: "Waistcoat Suit",
        labelUr: "ویسکٹ سوٹ",
      },
      { value: "Prince Coat", labelEn: "Prince Coat", labelUr: "پرنس کوٹ" },
      { value: "Sindhi Suit", labelEn: "Sindhi Suit", labelUr: "سندھی سوٹ" },
      { value: "Balochi Suit", labelEn: "Balochi Suit", labelUr: "بلوچی سوٹ" },
    ],
  },

  {
    name: "kameez_length",
    labelEn: "Kameez Length",
    labelUr: "قمیض کی لمبائی",
    placeholder: "Enter Kameez Length",
    type: "text",
  },
  {
    name: "salwar_length",
    labelEn: "Salwar Length",
    labelUr: "شلوار کی لمبائی",
    placeholder: "Enter Salwar Length",
    type: "text",
  },
  {
    name: "bazo_length",
    labelEn: "Bazo Length",
    labelUr: "بازو",
    placeholder: "Enter Bazo Length",
    type: "text",
  },
  {
    name: "neck_size",
    labelEn: "Neck Size",
    labelUr: "گردن",
    placeholder: "Enter Neck size",
    type: "text",
  },

  {
    name: "chest",
    labelEn: "Chest",
    labelUr: "چھاتی",
    placeholder: "Enter chest",
    type: "text",
  },
  {
    name: "asteen",
    labelEn: "Asteen",
    labelUr: "آستین",
    placeholder: "Enter chest",
    type: "text",
  },
  {
    name: "waist",
    labelEn: "Waist",
    labelUr: "کمر",
    placeholder: "Enter waist",
    type: "text",
  },
  {
    name: "shoulder",
    labelEn: "Shoulder",
    labelUr: "کندھا",
    placeholder: "Enter shoulder",
    type: "text",
  },
  {
    name: "collarstyle",
    labelEn: "Collar Style",
    labelUr: "کالر کا انداز",
    placeholder: "Enter Collar Style",
    type: "select",
    options: [
      { value: "bane", labelEn: "Bane", labelUr: "بین" },
      { value: "collar", labelEn: "Collar", labelUr: " کالر " },
    ],
  },
  {
    name: "bottomwidth",
    labelEn: "Gheera",
    labelUr: " گھیرا ",
    placeholder: "Enter Bottom Width",
    type: "select",
    options: [
      { value: "gool", labelEn: "Gool", labelUr: "گول" },
      { value: "chora", labelEn: "Chora", labelUr: "چوڑا" },
    ],
  },
  {
    name: "salwartype",
    labelEn: "Salwar Type",
    labelUr: "شلوار کی قسم",
    placeholder: "Enter Salwar Type",
    type: "select",
    options: [
      { value: "pajama_blochi", labelEn: "Pajama", labelUr: "پاجامہ" },
      { value: "sada", labelEn: "Sada", labelUr: "سادہ" },
      { value: "blochi", labelEn: "Blochi", labelUr: "بلوچی" },
      { value: "sindi", labelEn: "Sindi Salwar", labelUr: "سندھی" },
      { value: "traozar", labelEn: "Traozar", labelUr: "ٹراوزر" },
    ],
  },
  {
    name: "color",
    labelEn: "Suit Color",
    labelUr: "سوٹ کا رنگ",
    placeholder: "Enter Suit Color",
    type: "text",
  },
  {
    name: "clothsquantity",
    labelEn: "Clothes Number",
    labelUr: "کپڑوں کی تعداد",
    placeholder: "Enter Number of Clothes",
    type: "text",
  },
];

// ✅ 3rd Section: Tailor/Admin Only
export const tailorAdminFields: FormField[] = [
  {
    name: "payment",
    labelEn: "Payment",
    labelUr: "ادائیگی",
    type: "select",
    options: [
      { value: "advance", labelEn: "Advance", labelUr: "ایڈوانس" },
      { value: "after", labelEn: "After", labelUr: "بعد" },
    ],
  },
  {
    name: "basicPrice",
    labelEn: "Cloth Basic Price",
    labelUr: "کپڑے کی قیمت",
    type: "selectOrText", // New custom type for dual input
    placeholder: "Enter or select price",
    options: [
      { value: "2000", labelEn: "2000 PKR", labelUr: "2000 روپے" },
      { value: "2500", labelEn: "2500 PKR", labelUr: "2500 روپے" },
      { value: "3000", labelEn: "3000 PKR", labelUr: "3000 روپے" },
      {
        value: "custom",
        labelEn: "Custom Price",
        labelUr: "اپنی مرضی کی قیمت",
      },
    ],
  },
  {
    name: "totalBill",
    labelEn: "Total Bill",
    labelUr: "کل بل",
    placeholder: "Enter Price",
    type: "text",
  },
  {
    name: "delivery",
    labelEn: "Delivery",
    labelUr: "ڈلیوری",
    type: "select",
    options: [
      { value: "home", labelEn: "Home", labelUr: "گھر" },
      { value: "pickup", labelEn: "Pickup", labelUr: "پک اپ" },
    ],
  },
  {
    name: "delivery_date",
    labelEn: "Delivery Date",
    labelUr: "ڈلیوری کی تاریخ",
    type: "date",
    placeholder: "YYYY-MM-DD",
  },
];

// ------------------Customer Preveiw Fields


export interface CustomerPreviewProps {
  customer: FormData;
  onClose: () => void;
}

export const previewFields: { label: string; value: keyof FormData }[] = [
  { label: "Name", value: "name" },
  { label: "Address", value: "address" },
  { label: "Number", value: "number" },
  { label: "Kameez Length", value: "kameez_length" },
  { label: "Salwar Length", value: "salwar_length" },
  { label: "Bazo Length", value: "bazo_length" },
  { label: "Neck Size", value: "neck_size" },
  { label: "Suit Style", value: "suit_style" },
  { label: "Chest", value: "chest" },
  { label: "Waist", value: "waist" },
  { label: "Shoulder", value: "shoulder" },
  { label: "Asteen", value: "asteen" },
  { label: "Collar Style", value: "collarstyle" },
  { label: "Gheera", value: "bottomwidth" },
  { label: "Salwar Type", value: "salwartype" },
  { label: "Color", value: "color" },
  { label: "Payment", value: "payment" },
  { label: "Cloths Number", value: "clothsquantity" },
  { label: "Basic Price", value: "basicPrice" },
  { label: "Total Bill", value: "totalBill" },
  { label: "Delivery", value: "delivery" },
  { label: "Delivery Date", value: "delivery_date" },
  { label: "Status", value: "status" },
];

// // 👩 Women-only Preview Fields
// export const womenPreviewFields: { label: string; value: keyof FormData }[] = [
//   { label: "Suit Style", value: "w_suit_style" },
//   { label: "Front Neck Depth", value: "front_neck_depth" },
//   { label: "Back Neck Depth", value: "back_neck_depth" },
//   { label: "Hips", value: "hips" },
//   { label: "Armhole", value: "armhole" },
//   { label: "Neck Style", value: "w_collarstyle" }, // women-specific meaning
//   { label: "Gheera", value: "gheera" },
// ];
