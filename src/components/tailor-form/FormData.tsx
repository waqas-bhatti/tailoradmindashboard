"use client";

import React, { useEffect, useState } from "react";
import {
  personalInfoFields,
  clothesDetailFields,
  tailorAdminFields,
} from "@/lib/data";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userDetailSchema } from "@/app/schemas/AddNewSchema";
import { useForm } from "react-hook-form";
import { AppDispatch } from "@/lib/store";
import {
  addCustomer,
  editCustomers,
  fetchCustomer,
} from "@/lib/reduxStore/customers/customerSlice";
import { useGetCustomersQuery } from "@/lib/reduxStore/customers/customersApi";
import type { User } from "@/types/customerTypes";
import { useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NextResponse } from "next/server";
import { Calendar28 } from "@/app/components/Calendar28";
import { addDays, isAfter, isEqual, startOfDay } from "date-fns"; // Add date-fns
import { Value } from "@radix-ui/react-select";
import { MeasurementInput } from "./MeasurementInput";
interface FormDataProps {
  onClose: () => void;
  customer?: User;
  onSubmit: (data: z.infer<typeof userDetailSchema>) => Promise<void>;
  isSubmitting: boolean;
}

interface FormField {
  name: keyof z.infer<typeof userDetailSchema>;
  labelEn: string;
  labelUr: string;
  placeholder?: string;
  
  type?: "text" | "select" | "date" | "selectOrText";
  options?: { value: string; labelEn: string; labelUr: string }[];
}

const renderField = (field: FormField, formField: any) => {
  const [isCustomPrice, setIsCustomPrice] = useState(
    formField.value && !field.options?.some((opt) => opt.value === formField.value)
  );

  if (field.type === "select") {
    return (
      <Select
        name={field.name}
        onValueChange={formField.onChange}
        value={formField.value}
        defaultValue={formField.value}
      >
        <SelectTrigger className="w-full h-12 p-3">
          <SelectValue placeholder={field.placeholder || "Select an option"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{field.labelEn || ""}</SelectLabel>
            {field.options?.map((option) => (
             <SelectItem key={option.value} value={option.value}  className="w-full flex justify-between items-center">
          
              <span className="text-[16px]">{option.labelEn}</span>
             <span className="text-[16px]" dir="rtl">{option.labelUr}</span>
             
           </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  if (field.type === "date") {
    return (
      <Calendar28
        value={formField.value ? new Date(formField.value) : null}
        onChange={(val: Date | null) => {
          if (!val) {
            formField.onChange(null);
            return;
          }
          const year = val.getFullYear();
          const month = String(val.getMonth() + 1).padStart(2, "0");
          const day = String(val.getDate()).padStart(2, "0");
          formField.onChange(`${year}-${month}-${day}`);
        }}
      />
    );
  }

  if (field.type === "selectOrText") {
    return isCustomPrice ? (
      <Input
        type="number"
        placeholder={field.placeholder || "Enter price"}
        value={formField.value}
        onChange={formField.onChange}
        className="w-full h-12 p-2"
        min="0"
        step="0.01"
      />
    ) : (
      <Select
        name={field.name}
        onValueChange={(value) => {
          if (value === "custom") {
            setIsCustomPrice(true);
            formField.onChange("");
          } else {
            setIsCustomPrice(false);
            formField.onChange(value);
          }
        }}
        value={formField.value}
        defaultValue={formField.value}
      >
        <SelectTrigger className="w-full h-12 p-2">
          <SelectValue placeholder={field.placeholder || "Select an option"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{field.labelEn || ""}</SelectLabel>
            {field.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.labelUr} ({option.labelEn})
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }


  if (
  ["kameez_length", "salwar_length", "bazo_length", "neck_size", "chest", "waist", "shoulder", "asteen"].includes(
    field.name
  )
) {
  return (
    <MeasurementInput
      value={formField.value}
      onChange={(val) => formField.onChange(val)}
      placeholder={field.placeholder}
    />
  );
}
return <Input type="text" placeholder={field.placeholder} {...formField} />;
};

const FormData = ({ onClose, customer, onSubmit, isSubmitting }: FormDataProps) => {
  const {
      data: customers = [],
      isLoading,
      isError,
      error,
    } = useGetCustomersQuery();
  // const [error, setError] = useState<string | null>(null);
  const [existingCustomer, setExistingCustomer] = useState<User | null>(null);


  function formatDateToYMD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}


  // Default delivery date: 7 days from today
  const defaultDeliveryDate = addDays(new Date(), 7).toISOString().split("T")[0];

  const form = useForm<z.infer<typeof userDetailSchema>>({
    resolver: zodResolver(userDetailSchema),
    defaultValues: customer
      ? {
          ...customer,
          delivery_date: customer.delivery_date
            ? formatDateToYMD(new Date(customer.delivery_date))
            : defaultDeliveryDate,
          status:
            customer.delivery_date && customer.status !== "complete"
              ? isAfter(
                  startOfDay(new Date(customer.delivery_date)),
                  startOfDay(new Date())
                ) || isEqual(startOfDay(new Date(customer.delivery_date)), startOfDay(new Date()))
                ? "pending"
                : "complete"
              : customer.status || "pending",
        }
      : {
          name: "",
          number: "",
          address: "",
          kameez_length: "",
          salwar_length: "",
          bazo_length: "",
          neck_size : "",
          suit_style: "",
          chest: "",
          waist: "",
          shoulder: "",
          asteen: "",
          collarstyle: "",
          bottomwidth: "",
          salwartype: "",
          color: "",
          payment: "",
          clothsquantity: "",
          status: "pending",
          totalBill: "",
          basicPrice: "",
          delivery: "",
          delivery_date: defaultDeliveryDate,
        },
  });

  const deliveryDate = form.watch("delivery_date");

  // Dynamically update status based on delivery_date
  useEffect(() => {
    if (deliveryDate) {
      const deliveryDateObj = new Date(deliveryDate);
      const today = startOfDay(new Date());
      const isFutureOrToday =
        isAfter(startOfDay(deliveryDateObj), today) ||
        isEqual(startOfDay(deliveryDateObj), today);
      form.setValue("status", isFutureOrToday ? "pending" : "complete");
    } else {
      form.setValue("status", "pending"); // Default to pending if no delivery date
    }
  }, [deliveryDate, form]);

  const numberValue = form.watch("number");

  useEffect(() => {
  if (!numberValue) {
    setExistingCustomer(null);
    return;
  }

  // console.log("RTK customers array length:", customers.length);
  // // eslint-disable-next-line no-console
  // console.log("RTK customers (first 3):", customers.slice(0, 3));

  const match = customers.find((c: User) => String(c.number) === String(numberValue));
  setExistingCustomer(match || null);
}, [numberValue, customers]);

  const useExistingCustomer = () => {
    if (existingCustomer) { 
      form.reset({
        name: existingCustomer.name || "",
        number: existingCustomer.number || "",
        address: existingCustomer.address || "",
        kameez_length: existingCustomer.kameez_length || "",
        salwar_length: existingCustomer.salwar_length || "",
        neck_size: existingCustomer.neck_size || "",
        bazo_length: existingCustomer.bazo_length || "",
        suit_style: existingCustomer.suit_style || "",
        chest: existingCustomer.chest || "",
        waist: existingCustomer.waist || "",
        shoulder: existingCustomer.shoulder || "",
        asteen: existingCustomer.asteen || "",
        collarstyle: existingCustomer.collarstyle || "",
        bottomwidth: existingCustomer.bottomwidth || "",
        salwartype: existingCustomer.salwartype || "",
        color: existingCustomer.color || "",
        payment: existingCustomer.payment || "",
        clothsquantity: existingCustomer.clothsquantity || "",
        status: existingCustomer.status || "pending",
        totalBill: existingCustomer.totalBill?.toString() || "",
        basicPrice: existingCustomer.basicPrice || "",
        delivery: existingCustomer.delivery || "",
        delivery_date: existingCustomer.delivery_date
          ? new Date(existingCustomer.delivery_date).toISOString().split("T")[0]
          : defaultDeliveryDate,
      });
    }
  };

  const handleFormSubmit = async (data: z.infer<typeof userDetailSchema>) => {
  console.log("Submitting data:", data); // Debug log
  try {
    await onSubmit(data);
    form.reset();
    onClose();
  } catch (error) {
    console.error("Submission error:", error); // Debug log
  }
};

  const clothsquantity = form.watch("clothsquantity");
  const basicPrice = form.watch("basicPrice");

  useEffect(() => {
    const qty = parseInt(clothsquantity || "0", 10);
    const price = parseFloat(basicPrice || "0");
    const total = qty * price;
    form.setValue("totalBill", isNaN(total) ? "" : total.toString());
  }, [clothsquantity, basicPrice, form]);

  return (
    <Form {...form}>
      {existingCustomer && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md mb-4">
          Customer <strong>{existingCustomer.name}</strong> with number{" "}
          <strong>{existingCustomer.number}</strong> already exists.{" "}
          <button
            type="button"
            onClick={useExistingCustomer}
            className="underline text-blue-600 ml-2"
          >
            Use this customer’s details
          </button>
        </div>
      )}

      {error && <div className="text-red-500 text-center">{isError}</div>}

      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="text-center my-6">
          <h2 className="text-lg font-semibold inline-block relative">
            Personal Information
            <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-orange-500 mx-auto w-12"></span>
          </h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-3 gap-x-6 gap-y-6">
          {personalInfoFields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <div className="flex justify-between mb-2">
                    <FormLabel className="text-left text-[16px]">
                      {field.labelEn}
                    </FormLabel>
                    <FormLabel
                      className="text-right text-[20px]"
                      style={{ direction: "rtl" }}
                    >
                      {field.labelUr}
                    </FormLabel>
                  </div>
                  <FormControl>
                    {renderField(field, formField)}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="text-center my-6">
          <h2 className="text-lg font-semibold inline-block relative">
            Clothes Detail
            <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-orange-500 mx-auto w-12"></span>
          </h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-3 gap-x-6 gap-y-6">
          {clothesDetailFields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <div className="flex justify-between mb-2">
                    <FormLabel className="text-left text-[16px]">
                      {field.labelEn}
                    </FormLabel>
                    <FormLabel
                      className="text-right text-[20px]"
                      style={{ direction: "rtl" }}
                    >
                      {field.labelUr}
                    </FormLabel>
                  </div>
                  <FormControl>
                    {renderField(field, formField)}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="text-center my-6">
          <h2 className="text-lg font-semibold inline-block relative">
            Tailor Use Only
            <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-orange-500 mx-auto w-12"></span>
          </h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-3 gap-x-6 gap-y-6">
          {tailorAdminFields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <div className="flex justify-between mb-2">
                    <FormLabel className="text-left text-[16px]">
                      {field.labelEn}
                    </FormLabel>
                    <FormLabel
                      className="text-right text-[20px]"
                      style={{ direction: "rtl" }}
                    >
                      {field.labelUr}
                    </FormLabel>
                  </div>
                  <FormControl>
                    {field.name === "totalBill" ? (
                      <Input readOnly {...formField} value={formField.value || ""} />
                    ) : (
                      renderField(field, formField)
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {customer ? "Updating..." : "Saving..."}
              </>
            ) : customer ? (
              "Update"
            ) : (
              "Add"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormData;