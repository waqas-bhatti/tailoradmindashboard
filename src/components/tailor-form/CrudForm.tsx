"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import {
  useGetCustomersQuery,
  useAddCustomerMutation,
  useEditCustomerMutation,
  useDeleteCustomerMutation,
  useSoftDeleteCustomerMutation,
  useRestoreCustomerMutation,
} from "@/lib/reduxStore/customers/customersApi";

import { addDays, endOfMonth, endOfWeek, isAfter, isBefore, isEqual, startOfDay, startOfMonth, startOfWeek, subDays } from "date-fns";
import { userDetailSchema } from "@/app/schemas/AddNewSchema";
import CustomerPreview from "./CustomerPreview";
import { useForm } from "react-hook-form";
import FormData from "./FormData";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { RootState, AppDispatch } from "@/lib/store";
import { editCustomers, fetchCustomer, softDeleteCustomer } from "@/lib/reduxStore/customers/customerSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import PrintContent from "./PrintContent";
import { useLanguage } from "@/context/LanguageContext";
import { usePremium } from "@/context/PremiumContext";
import { premiumFeatures } from "@/lib/premiumConfig";

interface CrudFormProps {
  searchText: string;
  delayedSearchText: string;
  selectDay: string;
  selectDate: Date | null;
  status: string;
}

const CrudForm: React.FC<CrudFormProps> = ({
  searchText,
  selectDay,
  selectDate,
  status,
  delayedSearchText
}) => {
  const {
    data: customers = [],
    isLoading,
    isError,
    error,
  } = useGetCustomersQuery();

  const { language } = useLanguage(); // Use global language context

   // ✅ Mutations
  const [editCustomer] = useEditCustomerMutation();
  const [softDeleteCustomer] = useSoftDeleteCustomerMutation();

  const [expandedState, setExpandedState] = useState<{
    id: string | null;
    mode: "edit" | "preview" | null;
  }>({ id: null, mode: null });


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const printRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const { checkPremiumAccess } = usePremium();

  // Set up the print handler with react-to-print
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Order Details",
  });

  // Ref to store the current order being printed
  const [currentOrder, setCurrentOrder] = useState<any>(null);

  // Function to prepare and trigger print for a specific order
  const printOrder = (order: any) => {
    //  if (!checkPremiumAccess(premiumFeatures.invoice.print.id)) {
    //   return;
    // }
    setCurrentOrder(order);
    setTimeout(() => {
      handlePrint();
    }, 100);
  };

  const form = useForm<z.infer<typeof userDetailSchema>>({
    resolver: zodResolver(userDetailSchema),
    defaultValues: {
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
      totalBill: "",
      advanceAmount: "",
          remeaningAmount: "",
      basicPrice: "",
      delivery: "",
      delivery_date: addDays(new Date(), 7).toISOString().split("T")[0],
      status: "pending"
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      const customer = customers.find((c) => c.id === id);
      if (!customer) {
        throw new Error("Customer not found");
      }
      await softDeleteCustomer(id).unwrap();
      if (expandedState.id === id) {
        setExpandedState({ id: null, mode: null });
        form.reset();
      }
    } catch (err: any) {
      console.error("Failed to delete customer:", err);
      setSubmitError(err || "Failed to delete customer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
   function formatDateToYMD(date: Date | string): string {
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return "";
      
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  }

  // In CrudForm.tsx
  const toggleExpand = (id: string, mode: "edit" | "preview") => {
    if (expandedState.id === id && expandedState.mode === mode) {
      setExpandedState({ id: null, mode: null });
      form.reset();
      setSubmitError(null);
    } else {
      setExpandedState({ id, mode });
      setSubmitError(null);
      if (mode === "edit") {
        const customerToEdit = customers.find((c) => c.id === id);
        if (customerToEdit) {
          form.reset({
            ...customerToEdit,
            advanceAmount: customerToEdit.advanceAmount ?? "",
            remeaningAmount: customerToEdit.remeaningAmount ?? "",
            status: customerToEdit.status || "pending",
            customers_id: customerToEdit.customers_id || id,
            delivery_date: customerToEdit.delivery_date
                ? formatDateToYMD(new Date(customerToEdit.delivery_date))
                : formatDateToYMD(addDays(new Date(), 7)),
          });
        }
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof userDetailSchema>) => {
    if (!expandedState.id) {
      setSubmitError("No customer selected for editing.");
      return;
    }
    
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const customer = customers.find((c) => c.id === expandedState.id);
      if (!customer) throw new Error("Customer not found.");

      // Use the helper function to determine status
      const isDelivered = data.delivery_date ? isDeliveryDatePassed(data.delivery_date) : false;
      
      const customerData = {
        ...data,
        order_id: expandedState.id,
        customers_id: customer.customers_id,
        delivery_date: data.delivery_date || null,
        status: isDelivered ? "complete" : "pending", // Simplified logic
      };

      console.log("Submitting customer data:", customerData);
      await editCustomer(customerData).unwrap();
      setExpandedState({ id: null, mode: null });
      form.reset();
    } catch (err: any) {
      console.error("Failed to save customer:", err);
      setSubmitError(err.message || "Failed to save customer data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // ================= FILTERING =================
  const filteredCustomers = customers.filter((customer) => {

    if (customer.is_deleted) return false;

    // Agar koi filter active nahin, to sab show karein
    if (!delayedSearchText && !status && !selectDate && !selectDay) {
      return true;
    }

    // Search filter
    const matchesSearch = delayedSearchText
      ? customer.name.toLowerCase().includes(delayedSearchText.toLowerCase()) ||
        customer.number.toString().includes(delayedSearchText)
      : true;

    // Status filter
    const matchesStatus = status ? customer.status === status : true;

    // Date filters
    let matchesDate = true;
    if (isClient) {
      const createdAt = startOfDay(new Date(customer.created_at));
      
      // Specific date filter ko priority dein
      if (selectDate) {
        matchesDate = isEqual(createdAt, startOfDay(selectDate));
      } 
      // Agar specific date select nahin, to day range (today, week, etc.) check karein
      else if (selectDay) {
        const today = startOfDay(new Date());
        switch (selectDay) {
          case "today":
            matchesDate = isEqual(createdAt, today);
            break;
          case "yesterday":
            matchesDate = isEqual(createdAt, subDays(today, 1));
            break;
          case "week":
            matchesDate = createdAt >= startOfWeek(today) && createdAt <= endOfWeek(today);
            break;
          case "month":
            matchesDate = createdAt >= startOfMonth(today) && createdAt <= endOfMonth(today);
            break;
        }
      }
    }

    // Tamam active filters ko check karein
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Add this helper function at the top of your component
 const isDeliveryDatePassed = (deliveryDate: string | null | undefined): boolean => {
  if (!deliveryDate) return false;
  try {
    const today = startOfDay(new Date());
    const delivery = startOfDay(new Date(deliveryDate));
    
    // YEH SAHI LOGIC HAI: Check karein agar delivery date guzar chuki hai (isBefore) ya aaj hai (isEqual)
    return isBefore(delivery, today) || isEqual(delivery, today);
  } catch (error) {
    console.error("Invalid date format for delivery_date:", deliveryDate, error);
    return false;
  }
};

  // Replace your useEffect with this
  useEffect(() => {
    if (!isClient) return;
    
    const updateOverdueOrders = () => {
      console.log("Checking for overdue orders...");
      customers.forEach(async (customer) => {
        // Sirf 'pending' status wale orders ko check karein
        if (customer.status === "pending" && isDeliveryDatePassed(customer.delivery_date)) {
          console.log(`Updating status for order ID: ${customer.id}`);
          try {
            await editCustomer({
              order_id: customer.id,
              customers_id: customer.customers_id,
              status: "complete",
            }).unwrap();
          } catch (err) {
            console.error(`Failed to auto-update status for order ${customer.id}:`, err);
          }
        }
      });
    };
    // Run this check periodically (every hour) to catch overdue orders
    updateOverdueOrders();
     const interval = setInterval(updateOverdueOrders, 60000); 
    
    return () => clearInterval(interval);
  }, [customers, isClient]);

  // ======================Pagination=======================
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCustomers = filteredCustomers
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  // Multilingual texts
  const texts = {
    en: {
      title: "Total Customers",
      noCustomers: "No customers found.",
      name: "Name",
      number: "Number",
      deliveryDate: "Delivery Date",
      status: "Status",
      print: "Print",
      actions: "Actions",
      moveToTrash: "Move to Trash?",
      trashDescription: "This customer will be removed from the active list and moved to Trash.",
      cancel: "Cancel",
      confirm: "Confirm",
      loading: "Loading...",
      error: "Error loading customers.",
      searching: "Searching...",
      rowsPerPage: "Rows per page",
      complete: "complete",
      pending: "pending"
    },
    ur: {
      title: "کل گاہک",
      noCustomers: "کوئی گاہک نہیں ملا۔",
      name: "نام",
      number: "نمبر",
      deliveryDate: "ڈیلیوری تاریخ",
      status: "حالت",
      print: "پرنٹ",
      actions: "اعمال",
      moveToTrash: "کچرے میں منتقل کریں؟",
      trashDescription: "یہ گاہک فعال فہرست سے ہٹا دیا جائے گا اور کچرے میں منتقل کر دیا جائے گا۔",
      cancel: "منسوخ",
      confirm: "تصدیق",
      loading: "لوڈ ہو رہا ہے...",
      error: "گاہکوں کو لوڈ کرنے میں خرابی۔",
      searching: "تلاش ہو رہی ہے...",
      rowsPerPage: "فی صفحہ قطاریں",
      complete: "مکمل",
      pending: "زیر التواء"
    },
    hi: {
      title: "कुल ग्राहक",
      noCustomers: "कोई ग्राहक नहीं मिला।",
      name: "नाम",
      number: "नंबर",
      deliveryDate: "डिलीवरी तारीख",
      status: "स्थिति",
      print: "प्रिंट",
      actions: "कार्रवाई",
      moveToTrash: "कचरे में ले जाएं?",
      trashDescription: "यह ग्राहक सक्रिय सूची से हटा दिया जाएगा और कचरे में ले जाया जाएगा।",
      cancel: "रद्द करें",
      confirm: "पुष्टि करें",
      loading: "लोड हो रहा है...",
      error: "ग्राहकों को लोड करने में त्रुटि।",
      searching: "खोज रहा है...",
      rowsPerPage: "प्रति पृष्ठ पंक्तियाँ",
      complete: "पूर्ण",
      pending: "लंबित"
    },
    ar: {
      title: "إجمالي العملاء",
      noCustomers: "لم يتم العثور على عملاء.",
      name: "الاسم",
      number: "الرقم",
      deliveryDate: "تاريخ التسليم",
      status: "الحالة",
      print: "طباعة",
      actions: "الإجراءات",
      moveToTrash: "نقل إلى المهملات؟",
      trashDescription: "سيتم إزالة هذا العميل من القائمة النشطة ونقله إلى المهملات.",
      cancel: "إلغاء",
      confirm: "تأكيد",
      loading: "جاري التحميل...",
      error: "خطأ في تحميل العملاء.",
      searching: "جاري البحث...",
      rowsPerPage: "صفوف في الصفحة",
      complete: "مكتمل",
      pending: "معلق"
    },
    de: {
      title: "Gesamtkunden",
      noCustomers: "Keine Kunden gefunden.",
      name: "Name",
      number: "Nummer",
      deliveryDate: "Lieferdatum",
      status: "Status",
      print: "Drucken",
      actions: "Aktionen",
      moveToTrash: "In Papierkorb verschieben?",
      trashDescription: "Dieser Kunde wird aus der aktiven Liste entfernt und in den Papierkorb verschoben.",
      cancel: "Abbrechen",
      confirm: "Bestätigen",
      loading: "Lädt...",
      error: "Fehler beim Laden der Kunden.",
      searching: "Suche läuft...",
      rowsPerPage: "Zeilen pro Seite",
      complete: "abgeschlossen",
      pending: "ausstehend"
    },
    fr: {
      title: "Clients totaux",
      noCustomers: "Aucun client trouvé.",
      name: "Nom",
      number: "Numéro",
      deliveryDate: "Date de livraison",
      status: "Statut",
      print: "Imprimer",
      actions: "Actions",
      moveToTrash: "Déplacer vers la corbeille ?",
      trashDescription: "Ce client sera retiré de la liste active et déplacé vers la corbeille.",
      cancel: "Annuler",
      confirm: "Confirmer",
      loading: "Chargement...",
      error: "Erreur lors du chargement des clients.",
      searching: "Recherche en cours...",
      rowsPerPage: "Lignes par page",
      complete: "terminé",
      pending: "en attente"
    },
    tr: {
      title: "Toplam Müşteri",
      noCustomers: "Müşteri bulunamadı.",
      name: "İsim",
      number: "Numara",
      deliveryDate: "Teslimat Tarihi",
      status: "Durum",
      print: "Yazdır",
      actions: "İşlemler",
      moveToTrash: "Çöp Kutusuna Taşı?",
      trashDescription: "Bu müşteri aktif listeden kaldırılacak ve çöp kutusuna taşınacak.",
      cancel: "İptal",
      confirm: "Onayla",
      loading: "Yükleniyor...",
      error: "Müşteriler yüklenirken hata.",
      searching: "Aranıyor...",
      rowsPerPage: "Sayfa başına satır",
      complete: "tamamlandı",
      pending: "beklemede"
    }
  };

  const t = texts[language] || texts.en;

  // Don't render anything until we're on the client to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="overflow-x-auto p-4 bg-gray-100 dark:bg-gray-800 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-4 bg-gray-100 dark:bg-gray-800 min-h-screen">
      {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">{isError}</div>}
      {submitError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">{submitError}</div>
      )}
      {isLoading && (
        <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded-lg">{t.loading}</div>
      )}
      {isSearching && (
        <div className="mb-4 p-4 bg-yellow-100 text-yellow-700 rounded-lg">{t.searching}</div>
      )}

      <div className="hidden">
        {currentOrder && (
          <div ref={printRef}>
            <PrintContent order={currentOrder} />
          </div>
        )}
      </div>

      <div className="mb-4 flex justify-between items-center">
     <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
      {t.title} : [{filteredCustomers.length} of {customers.length} total]
     </h2>
     </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <thead className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white text-sm uppercase tracking-wider">
          <tr>
            <th className="px-6 py-3">{t.name}</th>
            <th className="px-6 py-3">{t.number}</th>
            <th className="px-6 py-3">{t.deliveryDate}</th>
            <th className="px-6 py-3">{t.status}</th>
            <th className="px-6 py-3">{t.print}</th>
            <th className="px-6 py-3 text-right">{t.actions}</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCustomers.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500 dark:text-gray-300">
                {t.noCustomers}
              </td>
            </tr>
          ) : (
            paginatedCustomers.map((customer) => (
              <React.Fragment key={customer.id}>
                <tr className="border-b dark:border-gray-600">
                  <td className="px-4 py-3">{customer.name}</td>
                  <td className="px-4 py-3">{customer.number}</td>
                  <td className="px-4 py-3">{customer.delivery_date || "-"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "px-3 py-1 rounded text-white text-sm font-medium",
                        customer.status === "complete"
                          ? "bg-green-600"
                          : "bg-yellow-500"
                      )}
                    >
                      {customer.status === "complete" ? t.complete : t.pending}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                   <button
                          onClick={() => printOrder(customer)}
                          className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                        >
                          {t.print}
                        </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => toggleExpand(customer.id, "edit")}
                        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        disabled={isSubmitting}
                      >
                        <Pencil className="w-4 h-4 mr-1" />
                      </button>
                      <button
                        onClick={() => toggleExpand(customer.id, "preview")}
                        className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                        disabled={isSubmitting}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                      </button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            className="flex items-center px-3 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-600 hover:text-white"
                            disabled={isSubmitting}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{t.moveToTrash}</AlertDialogTitle>
                            <AlertDialogDescription>
                              {t.trashDescription}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(customer.id)}>
                              {t.confirm}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
                {expandedState.id === customer.id && expandedState.mode === "edit" && (
                  <tr>
                    <td colSpan={6} className="p-4">
                      <FormData
                        customer={customer}
                        onClose={() => setExpandedState({ id: null, mode: null })}
                        onSubmit={onSubmit}
                        isSubmitting={isSubmitting}
                      />
                    </td>
                  </tr>
                )}

                {expandedState.id === customer.id && expandedState.mode === "preview" && (
                  <tr>
                    <td colSpan={6}>
                      <CustomerPreview
                        customer={customer}
                        onClose={() => setExpandedState({ id: null, mode: null })}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {filteredCustomers.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          {/* Items per page dropdown */}
          <Select
            value={String(itemsPerPage)}
            onValueChange={(val) => {
              setItemsPerPage(Number(val));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={t.rowsPerPage} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default CrudForm;