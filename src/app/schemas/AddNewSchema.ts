import { z } from "zod";
import { usernameValidation, measurementValidation } from "./commonValidation";

export const userDetailSchema = z.object({
  id: z.string().optional(),
  name: usernameValidation,
  number: z
    .string()
    .length(11, { message: "Number must be exactly 11 characters" })
    .nonempty("Number is required"),
  address: z.string().nonempty("Address is required"),

  // 👉 Common measurement fields
  kameez_length: measurementValidation.optional(),
  salwar_length: measurementValidation.optional(),
  suit_style: z.string().nonempty("Suit style Required"),
  bazo_length: measurementValidation.optional(),
  waist: measurementValidation.optional(),
  shoulder: measurementValidation.optional(),

  // 👉 Man-specific fields
  chest: measurementValidation.optional(),
  asteen: measurementValidation.optional(),
  neck_size: z.string().optional(),
  bottomwidth: z.string().optional(),

  // 👉 Styles (shared, different validation messages)
  collarstyle: z.string().optional(), // men: "Collar style", women: "Neck style"
  salwartype: z.string().optional(),

  // 👉 Business fields
  color: z.string().nonempty("Color is required"),
  payment: z.string().nonempty("Payment is required"),
  clothsquantity: z.string().nonempty("Cloths number is required"),
  status: z.string().nonempty("Status is required"),
  totalBill: z.string().nonempty("Total bill is required"),
  basicPrice: z.string().nonempty("Basic price is required"),
  delivery: z.string().nonempty("Delivery is required"),
  delivery_date: z.string().nullable(),

  // 👉 Backend compatibility
  customers_id: z.string().optional(),
  order_id: z.string().optional(),
});
