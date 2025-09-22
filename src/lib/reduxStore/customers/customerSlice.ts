import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userDetailSchema } from "@/app/schemas/AddNewSchema";
import z from "zod";
import { RootState } from "@/lib/store";
import type { User } from "@/types/customerTypes";

export type Status = "pending" | "complete";
// export const combineScheme = z.union([userDetailSchema, womenSchema])

interface CustomerState {
  customers: User[];
  trashed: User[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  customers: [],
  trashed: [],
  loading: false,
  error: null,
};

function formatDateToYMD(date: Date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const normalizeUser = (raw: any): User => {
  // Supabase returns customer data in a nested object
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

const cryptoRandomId = () =>
  Math.random().toString(36).slice(2) + Date.now().toString(36);

export const fetchCustomer = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("customers/fetch", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("/api/users");
    const arr = Array.isArray(data) ? data : [];
    return arr.map(normalizeUser);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.error || "Failed to fetch customer data"
    );
  }
});

export const addCustomer = createAsyncThunk<
  User,
  z.infer<typeof userDetailSchema>, // ✅ allow both schemas
  { rejectValue: string }
>("customers/addCustomer", async (customerData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/api/users", customerData);
    return normalizeUser(data);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || error.message || "Failed to add customer";
    return rejectWithValue(errorMessage);
  }
});
export const editCustomers = createAsyncThunk<
  User,
  any,
  { rejectValue: string }
>("customers/editCustomers", async (customerData, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`/api/users`, customerData);
    return normalizeUser(data);
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || "Failed to update customer"
    );
  }
});

export const deleteCustomers = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("customers/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/users?id=${encodeURIComponent(id)}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.error || "Failed to delete customer"
    );
  }
});

export const softDeleteCustomer = createAsyncThunk<
  string,
  string,
  { rejectValue: string; state: RootState }
>(
  "customers/softDelete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState();
      const customer = state.customers.customers.find((c) => c.id === id);
      if (!customer) {
        return rejectWithValue("Customer not found.");
      }
      const orderId = customer.order_id;
      await axios.put("/api/users", { order_id: orderId, is_deleted: true });
      await dispatch(fetchCustomer()).unwrap();
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.error || "Failed to soft delete customer"
      );
    }
  }
);

export const restoreCustomer = createAsyncThunk<
  string,
  string,
  { rejectValue: string; state: RootState }
>("customers/restore", async (id, { rejectWithValue, getState, dispatch }) => {
  try {
    const state = getState();
    const customer = state.customers.trashed.find((c) => c.id === id);
    if (!customer) {
      return rejectWithValue("Customer not found in trash.");
    }
    const orderId = customer.order_id;
    await axios.put("/api/users", { order_id: orderId, is_deleted: false });
    await dispatch(fetchCustomer()).unwrap();
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.error || "Failed to restore customer"
    );
  }
});

const customerSlices = createSlice({
  name: "customers",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    purgeTrash: (state, action) => {
      state.trashed = state.trashed.filter((c) => c.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.filter((c) => !c.is_deleted);
        state.trashed = action.payload.filter((c) => c.is_deleted);
      })
      .addCase(fetchCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch customer data";
      })
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.loading = false;
        const exists = state.customers.some((c) => c.id === action.payload.id);
        if (!exists) state.customers.unshift(action.payload);
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add customer";
      })
      .addCase(editCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCustomers.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const idx = state.customers.findIndex((c) => c.id === updated.id);
        if (idx !== -1) state.customers[idx] = updated;
        else state.customers.unshift(updated);
      })
      .addCase(editCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to edit customer";
      })
      .addCase(deleteCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCustomers.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.customers = state.customers.filter((c) => c.id !== id);
        state.trashed = state.trashed.filter((c) => c.id !== id);
      })
      .addCase(deleteCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete customer";
      })
      .addCase(softDeleteCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(softDeleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        const customer = state.customers.find((c) => c.id === id);
        if (customer) {
          state.customers = state.customers.filter((c) => c.id !== id);
          state.trashed = [...state.trashed, { ...customer, is_deleted: true }];
        }
      })
      .addCase(softDeleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to soft delete customer";
      })
      .addCase(restoreCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restoreCustomer.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        const customer = state.trashed.find((c) => c.id === id);
        if (customer) {
          state.trashed = state.trashed.filter((c) => c.id !== id);
          state.customers.unshift({ ...customer, is_deleted: false });
        }
      })
      .addCase(restoreCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to restore customer";
      });
  },
});

export const { clearError, purgeTrash } = customerSlices.actions;
export default customerSlices.reducer;
