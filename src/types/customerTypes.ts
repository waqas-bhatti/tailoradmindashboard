// types/customerTypes.ts

export interface Order {
  order_id: string;
  kameez_length: string;
  salwar_length: string;
  suit_style: string;
  chest: string;
  waist: string;
  shoulder: string;
  asteen: string;
  collarstyle: string;
  bottomwidth: string;
  salwartype: string;
  color: string;
  payment: string;
  clothsquantity: string;
  totalBill: string;
  basicPrice: string;
  delivery: string;
  status: string;
  created_at: string;
}

export interface User {
  id: string;
  order_id: string;
  customers_id?: string;
  name: string;
  address: string;
  number: string;
  kameez_length: string;
  salwar_length: string;
  bazo_length: string;
  neck_size: string;
  suit_style: string;
  chest: string;
  //women data
  waist: string;
  shoulder: string;
  asteen: string;
  collarstyle: string;
  bottomwidth: string;
  salwartype: string;
  color: string;
  payment: string;
  clothsquantity: string;
  totalBill: string;
  basicPrice: string;
  delivery: string;
  delivery_date: string | null;
  created_at: string;
  status: string;
  orders: Order[];
  is_deleted: boolean;
}

export type Customer = User;
