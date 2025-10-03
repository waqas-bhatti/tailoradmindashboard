"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { restoreCustomer, fetchCustomer } from "@/lib/reduxStore/customers/customerSlice";
import {
  useGetCustomersQuery,
  useDeleteCustomerMutation,
  useRestoreCustomerMutation,
} from "@/lib/reduxStore/customers/customersApi";
import usePagination from "@/hooks/usePagination";
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select';
import { SelectItem } from '@radix-ui/react-select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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
import { Trash2, RotateCcw } from "lucide-react";
import useSearchParams from "@/hooks/useSearchParams";
import { useLanguage } from "@/context/LanguageContext";

const DeleteData = () => {
  const {
      data: customers = [],
      isLoading,
      isError,
      error,  
  } = useGetCustomersQuery();
  
  const [restoreCustomer] = useRestoreCustomerMutation();
  const [permanentDeleteCustomer] = useDeleteCustomerMutation();
  const [deletedId, setDeletedId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language } = useLanguage(); // Use global language context

  const trashed = customers.filter((c) => c.is_deleted === true);

  const {
    searchText,
    delayedSearchText,
    setSearchText,
    clearSearch,
    triggerSearch,
    isSearching,
  } = useSearchParams(300);

  // Filter deleted customers based on search
  const filteredCustomers = trashed.filter((customer) =>
    customer.name.toLowerCase().includes(delayedSearchText.toLowerCase()) ||
    customer.number.toString().includes(delayedSearchText.toLowerCase())
  );

  const {
    currentData,
    currentPage,
    totalPages,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
  } = usePagination(filteredCustomers, 5);

  const handleRestore = async (id: string) => {
    try {
      setIsSubmitting(true);
      await restoreCustomer(id).unwrap();
    } catch (error) {
      console.error("Failed to restore customer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePermanentDelete = async (id: string) => {
    try {
      setIsSubmitting(true);
      setDeletedId(id);
      await permanentDeleteCustomer(id).unwrap();
    } catch (error:any) {
      throw new Error("Failed to Delete the customer");
    } finally {
      setIsSubmitting(false);
      setDeletedId(null);
    }
  }

  // Multilingual texts
  const texts = {
    en: {
      title: "Delete History",
      searchPlaceholder: "Search by name or order id",
      clothNo: "Cloth No",
      name: "Name",
      number: "Number",
      actions: "Actions",
      noDeleted: "No deleted customers.",
      restore: "Restore",
      restoring: "Restoring...",
      permanentDelete: "Delete Forever",
      deleting: "Deleting...",
      deleteConfirmTitle: "Permanently Delete Customer?",
      deleteConfirmDescription: "This action cannot be undone. This will permanently delete the customer and all their data from the system.",
      cancel: "Cancel",
      confirmDelete: "Yes, Delete Forever",
      rowsPerPage: "Rows per page",
    },
    ur: {
      title: "ڈیلیٹ ہسٹری",
      searchPlaceholder: "نام یا آرڈر آئی ڈی سے تلاش کریں",
      clothNo: "کپڑے نمبر",
      name: "نام",
      number: "نمبر",
      actions: "اعمال",
      noDeleted: "کوئی ڈیلیٹ شدہ گاہک نہیں۔",
      restore: "بحال کریں",
      restoring: "بحال ہو رہا ہے...",
      permanentDelete: "ہمیشہ کے لیے ڈیلیٹ کریں",
      deleting: "ڈیلیٹ ہو رہا ہے...",
      deleteConfirmTitle: "گاہک کو مستقل طور پر ڈیلیٹ کریں؟",
      deleteConfirmDescription: "یہ عمل واپس نہیں ہو سکتا۔ یہ گاہک اور ان کا تمام ڈیٹا سسٹم سے ہمیشہ کے لیے ڈیلیٹ ہو جائے گا۔",
      cancel: "منسوخ",
      confirmDelete: "جی ہاں، ہمیشہ کے لیے ڈیلیٹ کریں",
      rowsPerPage: "فی صفحہ قطاریں",
    },
    hi: {
      title: "डिलीट इतिहास",
      searchPlaceholder: "नाम या ऑर्डर आईडी से खोजें",
      clothNo: "कपड़ा नंबर",
      name: "नाम",
      number: "नंबर",
      actions: "कार्रवाई",
      noDeleted: "कोई डिलीट किए गए ग्राहक नहीं।",
      restore: "पुनर्स्थापित करें",
      restoring: "पुनर्स्थापित हो रहा है...",
      permanentDelete: "हमेशा के लिए डिलीट करें",
      deleting: "डिलीट हो रहा है...",
      deleteConfirmTitle: "ग्राहक को स्थायी रूप से डिलीट करें?",
      deleteConfirmDescription: "इस क्रिया को पूर्ववत नहीं किया जा सकता। यह ग्राहक और उनका सारा डेटा सिस्टम से स्थायी रूप से डिलीट हो जाएगा।",
      cancel: "रद्द करें",
      confirmDelete: "हाँ, हमेशा के लिए डिलीट करें",
      rowsPerPage: "प्रति पृष्ठ पंक्तियाँ",
    },
    ar: {
      title: "سجل الحذف",
      searchPlaceholder: "البحث بالاسم أو معرف الطلب",
      clothNo: "رقم القماش",
      name: "الاسم",
      number: "الرقم",
      actions: "الإجراءات",
      noDeleted: "لا يوجد عملاء محذوفون.",
      restore: "استعادة",
      restoring: "جاري الاستعادة...",
      permanentDelete: "حذف إلى الأبد",
      deleting: "جاري الحذف...",
      deleteConfirmTitle: "حذف العميل بشكل دائم؟",
      deleteConfirmDescription: "لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف العميل وجميع بياناته من النظام بشكل دائم.",
      cancel: "إلغاء",
      confirmDelete: "نعم، احذف إلى الأبد",
      rowsPerPage: "صفوف في الصفحة",
    },
    de: {
      title: "Löschverlauf",
      searchPlaceholder: "Suche nach Name oder Bestell-ID",
      clothNo: "Stoffnummer",
      name: "Name",
      number: "Nummer",
      actions: "Aktionen",
      noDeleted: "Keine gelöschten Kunden.",
      restore: "Wiederherstellen",
      restoring: "Wird wiederhergestellt...",
      permanentDelete: "Endgültig löschen",
      deleting: "Wird gelöscht...",
      deleteConfirmTitle: "Kunden endgültig löschen?",
      deleteConfirmDescription: "Diese Aktion kann nicht rückgängig gemacht werden. Dadurch werden der Kunde und alle seine Daten dauerhaft aus dem System gelöscht.",
      cancel: "Abbrechen",
      confirmDelete: "Ja, endgültig löschen",
      rowsPerPage: "Zeilen pro Seite",
    },
    fr: {
      title: "Historique des suppressions",
      searchPlaceholder: "Rechercher par nom ou ID de commande",
      clothNo: "Numéro de tissu",
      name: "Nom",
      number: "Numéro",
      actions: "Actions",
      noDeleted: "Aucun client supprimé.",
      restore: "Restaurer",
      restoring: "Restauration...",
      permanentDelete: "Supprimer définitivement",
      deleting: "Suppression...",
      deleteConfirmTitle: "Supprimer définitivement le client ?",
      deleteConfirmDescription: "Cette action ne peut pas être annulée. Cela supprimera définitivement le client et toutes ses données du système.",
      cancel: "Annuler",
      confirmDelete: "Oui, supprimer définitivement",
      rowsPerPage: "Lignes par page",
    },
    tr: {
      title: "Silme Geçmişi",
      searchPlaceholder: "İsim veya sipariş ID ile ara",
      clothNo: "Kumaş No",
      name: "İsim",
      number: "Numara",
      actions: "İşlemler",
      noDeleted: "Silinmiş müşteri yok.",
      restore: "Geri Yükle",
      restoring: "Geri yükleniyor...",
      permanentDelete: "Kalıcı Olarak Sil",
      deleting: "Siliniyor...",
      deleteConfirmTitle: "Müşteriyi Kalıcı Olarak Sil?",
      deleteConfirmDescription: "Bu işlem geri alınamaz. Bu, müşteriyi ve tüm verilerini sistemden kalıcı olarak silecektir.",
      cancel: "İptal",
      confirmDelete: "Evet, Kalıcı Olarak Sil",
      rowsPerPage: "Sayfa başına satır",
    }
  };

  const t = texts[language] || texts.en;

  return (
    <div className="overflow-x-auto p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
      {/* Header with search */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">{t.title}</h2>
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={((e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                triggerSearch();
              }
            } ) }
            className="p-2 border border-amber-300 rounded w-64"
          />
          {searchText && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <thead className="bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white text-sm uppercase tracking-wider">
          <tr>
            <th className="px-6 py-3 rounded-tl-lg">{t.clothNo}</th>
            <th className="px-6 py-3">{t.name}</th>
            <th className="px-6 py-3">{t.number}</th>
            <th className="px-6 py-3 text-right rounded-tr-lg">{t.actions}</th>
          </tr>
        </thead>

        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-3 text-center text-gray-500">
                {t.noDeleted}
              </td>
            </tr>
          ) : (
            currentData.map((customer) => (
              <tr
                key={customer.id}
                className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {customer.clothsquantity}
                </td>
                <td className="px-4 py-3">{customer.name}</td>
                <td className="px-4 py-3">{customer.number}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleRestore(customer.id)}
                      disabled={isSubmitting}
                      className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      {isSubmitting ? t.restoring : t.restore}
                    </button>

                      <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                          disabled={isSubmitting}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          {t.permanentDelete}
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>{t.deleteConfirmTitle}</AlertDialogTitle>
                          <AlertDialogDescription>
                            {t.deleteConfirmDescription}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handlePermanentDelete(customer.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            {deletedId === customer.id && isSubmitting ? t.deleting : t.confirmDelete}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {filteredCustomers.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          {/* Rows per page */}
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

          {/* Page navigation */}
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
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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

export default DeleteData;