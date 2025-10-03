import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "@/types/customerTypes";

export type Status = "pending" | "complete";

// ------------------- Helpers -------------------
function formatDateToYMD(date: Date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const cryptoRandomId = () =>
  Math.random().toString(36).slice(2) + Date.now().toString(36);

const normalizeUser = (raw: any): User => {
  const customerData = raw.customers || {};
  const rawId = raw?.order_id ?? raw?.customers_id ?? raw?.id;
  const id =
    rawId !== undefined && rawId !== null ? String(rawId) : cryptoRandomId();

  const status: Status = raw?.status === "complete" ? "complete" : "pending";

  return {
    id,
    order_id: raw?.order_id ? String(raw.order_id) : id,
    customers_id: raw?.customers_id ? String(raw.customers_id) : undefined,
    is_deleted: raw?.is_deleted ?? false,
    orders: raw?.orders ?? [],
    name: customerData.name || raw?.name || "",
    address: customerData.address || raw?.address || "",
    number: customerData.number || raw?.number || "",
    kameez_length: raw?.kameez_length ?? "",
    salwar_length: raw?.salwar_length ?? "",
    bazo_length: raw?.bazo_length ?? "",
    neck_size: raw?.neck_size ?? "",
    suit_style: raw?.suit_style ?? "",
    chest: raw?.chest ?? "",
    waist: raw?.waist ?? "",
    shoulder: raw?.shoulder ?? "",
    asteen: raw?.asteen ?? "",
    collarstyle: raw?.collarstyle ?? "",
    bottomwidth: raw?.bottomwidth ?? "",
    salwartype: raw?.salwartype ?? "",
    color: raw?.color ?? "",
    payment: raw?.payment ?? "",
    clothsquantity: raw?.clothsquantity ?? "",
    totalBill: raw?.totalBill ?? "",
    advanceAmount: raw?.advanceAmount ?? "",
    remeaningAmount: raw?.remeaningAmount ?? "",
    basicPrice: raw?.basicPrice ?? "",
    delivery: raw?.delivery ?? "",
    delivery_date: raw?.delivery_date
      ? formatDateToYMD(new Date(raw.delivery_date))
      : "",
    status,
    created_at:
      raw.order_created_at ?? raw.created_at ?? new Date().toISOString(),
  };
};

// ------------------- API -------------------
export const customersApi = createApi({
  reducerPath: "customersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Customer"],
  endpoints: (builder) => ({
    getCustomers: builder.query<User[], void>({
      query: () => "/users",
      transformResponse: (response: any[]) => {
        return response.map(normalizeUser); // 👈 slice wali normalization function reuse karlo
      },
      providesTags: ["Customer"],
    }),

    addCustomer: builder.mutation<User, Partial<User>>({
      query: (customer) => ({
        url: "/users",
        method: "POST",
        body: customer,
      }),
      transformResponse: (response: any) => normalizeUser(response),
      invalidatesTags: ["Customer"],
    }),
    editCustomer: builder.mutation<User, Partial<User>>({
      query: (customer) => ({
        url: "/users",
        method: "PUT",
        body: customer,
      }),
      transformResponse: (response: any) => normalizeUser(response),
      invalidatesTags: ["Customer"],
    }),
    deleteCustomer: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer"],
    }),

    // Soft Delete
    softDeleteCustomer: builder.mutation<User, string>({
      query: (id) => ({
        url: "/users",
        method: "PUT",
        body: { order_id: id, is_deleted: true },
      }),
      transformResponse: (response: any) => normalizeUser(response),
      invalidatesTags: ["Customer"],
    }),

    // Restore
    restoreCustomer: builder.mutation<User, string>({
      query: (id) => ({
        url: "/users",
        method: "PUT",
        body: { order_id: id, is_deleted: false },
      }),
      transformResponse: (response: any) => normalizeUser(response),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useAddCustomerMutation,
  useEditCustomerMutation,
  useDeleteCustomerMutation,
  useSoftDeleteCustomerMutation,
  useRestoreCustomerMutation,
} = customersApi;
