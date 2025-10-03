"use client";

import React, { useEffect, useState } from "react";
import {
  personalInfoFields,
  clothesDetailFields,
  tailorAdminFields,
  Language,
  getLabel,
  getOptionLabel,
  getPlaceholder,
  getSectionTitle,
  getButtonText,
  getExistingCustomerMessage,
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
import { useGetCustomersQuery } from "@/lib/reduxStore/customers/customersApi";
import type { User } from "@/types/customerTypes";
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
import { Calendar28 } from "@/app/components/Calendar28";
import { addDays, isAfter, isEqual, startOfDay } from "date-fns";
import { MeasurementInput } from "./MeasurementInput";
import { useLanguage } from "@/context/LanguageContext";

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
  labelHi: string;
  labelAr: string;
  labelDe: string;
  labelFr: string;
  labelTr: string;
  placeholder?: string;
  type?: "text" | "select" | "date" | "selectOrText";
  options?: any[];
}

const FormData = ({
  onClose,
  customer,
  onSubmit,
  isSubmitting,
}: FormDataProps) => {
  const {
    data: customers = [],
    isLoading,
    isError,
    error,
  } = useGetCustomersQuery();

  const [existingCustomer, setExistingCustomer] = useState<User | null>(null);
  const { language } = useLanguage();

  const [isCustomPrice, setIsCustomPrice] = useState(false);

  function formatDateToYMD(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Default delivery date: 7 days from today
  const defaultDeliveryDate = addDays(new Date(), 7)
    .toISOString()
    .split("T")[0];

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
                ) ||
                isEqual(
                  startOfDay(new Date(customer.delivery_date)),
                  startOfDay(new Date())
                )
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
          neck_size: "",
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
          advanceAmount: "",
          remeaningAmount: "",
          basicPrice: "",
          delivery: "",
          delivery_date: defaultDeliveryDate,
        },
  });

  // ✅ Reset all fields function
  const resetAllFields = () => {
    form.reset({
      name: "",
      number: "",
      address: "",
      kameez_length: "",
      salwar_length: "",
      bazo_length: "",
      neck_size: "",
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
      advanceAmount: "",
      remeaningAmount: "",
      basicPrice: "",
      delivery: "",
      delivery_date: defaultDeliveryDate,
    });
    setIsCustomPrice(false);
    setExistingCustomer(null);
  };

  const deliveryDate = form.watch("delivery_date");
  const paymentMethod = form.watch("payment");
  const totalBill = form.watch("totalBill");
  const basicPriceValue = form.watch("basicPrice");
  const advanceAmountValue = form.watch("advanceAmount");
  const remainingAmountValue = form.watch("remeaningAmount");

  // ✅ Calculate remaining when advance changes
  useEffect(() => {
    const total = parseFloat(totalBill || "0");
    const advance = parseFloat(advanceAmountValue || "0");

    if (!isNaN(total) && !isNaN(advance)) {
      const remaining = total - advance;
      form.setValue("remeaningAmount", remaining >= 0 ? remaining.toString() : "0");
    } else {
      form.setValue("remeaningAmount", "");
    }
  }, [advanceAmountValue, totalBill, form]);

  // ✅ Reset custom price state when basicPrice changes
  useEffect(() => {
    if (
      basicPriceValue &&
      !["2000", "2500", "3000"].includes(basicPriceValue)
    ) {
      setIsCustomPrice(true);
    } else {
      setIsCustomPrice(false);
    }
  }, [basicPriceValue]);

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
      form.setValue("status", "pending");
    }
  }, [deliveryDate, form]);

  const numberValue = form.watch("number");

  useEffect(() => {
    if (!numberValue) {
      setExistingCustomer(null);
      return;
    }

    const match = customers.find(
      (c: User) => String(c.number) === String(numberValue)
    );
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
        advanceAmount: existingCustomer.advanceAmount || "",
        remeaningAmount: existingCustomer.remeaningAmount || "",
        basicPrice: existingCustomer.basicPrice || "",
        delivery: existingCustomer.delivery || "",
        delivery_date: existingCustomer.delivery_date
          ? new Date(existingCustomer.delivery_date).toISOString().split("T")[0]
          : defaultDeliveryDate,
      });
    }
  };

  const handleFormSubmit = async (data: z.infer<typeof userDetailSchema>) => {
    console.log("Submitting data:", data);

    // ✅ Add advance payment data to submission
    const submissionData = {
      ...data,
      advanceAmount: paymentMethod === "advance" ? advanceAmountValue : "0",
      remeaningAmount: paymentMethod === "advance" ? remainingAmountValue : data.totalBill,
    };

    try {
      await onSubmit(submissionData);
      // ✅ Reset all fields after successful submission
      resetAllFields();
      onClose();
    } catch (error) {
      console.error("Submission error:", error);
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

  // ✅ Render field function
  const renderField = (field: FormField, formField: any) => {
    if (field.type === "select") {
      return (
        <Select
          name={field.name}
          onValueChange={formField.onChange}
          value={formField.value}
          defaultValue={formField.value}
        >
          <SelectTrigger className="w-full h-12 p-3">
            <SelectValue
              placeholder={getPlaceholder(language, field.placeholder)}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{getLabel(field, language)}</SelectLabel>
              {field.options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="w-full flex justify-between items-center"
                >
                  <span className="text-[16px]">
                    {getOptionLabel(option, language)}
                  </span>
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
          placeholder={getPlaceholder(language, field.placeholder)}
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
            <SelectValue
              placeholder={getPlaceholder(language, field.placeholder)}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{getLabel(field, language)}</SelectLabel>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {getOptionLabel(option, language)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    }

    if (
      [
        "kameez_length",
        "salwar_length",
        "bazo_length",
        "neck_size",
        "chest",
        "waist",
        "shoulder",
        "asteen",
      ].includes(field.name)
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

  return (
    <Form {...form}>
      {existingCustomer && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md mb-4">
          <span
            dangerouslySetInnerHTML={{
              __html: getExistingCustomerMessage(existingCustomer, language)
                .message,
            }}
          />
          <button
            type="button"
            onClick={useExistingCustomer}
            className="underline text-blue-600 ml-2"
          >
            {getExistingCustomerMessage(existingCustomer, language).button}
          </button>
        </div>
      )}

      {error && <div className="text-red-500 text-center">{isError}</div>}

      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        {/* Personal Information Section */}
        <div className="text-center my-6">
          <h2 className="text-lg font-semibold inline-block relative">
            {getSectionTitle("personal", language)}
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
                    <FormLabel className="text-[16px] text-left">
                      {getLabel(field, language)}
                    </FormLabel>
                  </div>
                  <FormControl>
                    {renderField(field as FormField, formField)}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        {/* Clothes Detail Section */}
        <div className="text-center my-6">
          <h2 className="text-lg font-semibold inline-block relative">
            {getSectionTitle("clothes", language)}
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
                    <FormLabel className="text-[16px] text-left">
                      {getLabel(field, language)}
                    </FormLabel>
                  </div>
                  <FormControl>
                    {renderField(field as FormField, formField)}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        {/* Tailor Use Only Section */}
        <div className="text-center my-6">
          <h2 className="text-lg font-semibold inline-block relative">
            {getSectionTitle("tailor", language)}
            <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-orange-500 mx-auto w-12"></span>
          </h2>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-3 gap-x-6 gap-y-6">
          {tailorAdminFields
            .filter((field) => {
              // ✅ Show advance & remaining only if payment = "advance"
              if (
                (field.name === "advanceAmount" ||
                  field.name === "remeaningAmount") &&
                paymentMethod !== "advance"
              ) {
                return false;
              }
              return true;
            })
            .map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <div className="flex justify-between mb-2">
                      <FormLabel className="text-[16px] text-left">
                        {getLabel(field, language)}
                      </FormLabel>
                    </div>
                    <FormControl>
                      {field.name === "totalBill" ? (
                        <Input
                          readOnly
                          {...formField}
                          value={formField.value || ""}
                        />
                      ) : (
                        renderField(field as FormField, formField)
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            onClick={() => {
              resetAllFields();
              onClose();
            }}
            variant="outline"
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
          >
            {getButtonText("cancel", language)}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {customer
                  ? getButtonText("updating", language)
                  : getButtonText("saving", language)}
              </>
            ) : customer ? (
              getButtonText("update", language)
            ) : (
              getButtonText("add", language)
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormData;