'use client' 
import React, { useState } from 'react';
import { previewFields } from "@/lib/data";
import {User} from "@/types/customerTypes"
import usePagination from '@/hooks/usePagination';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '../ui/select';
import { useLanguage } from "@/context/LanguageContext"; // Import language context

interface UserHistoryTableProps {
  customer: User[];
  searchText: string;
}

const UserHistoryTable: React.FC<UserHistoryTableProps> = ({ customer, searchText }) => {
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [openOrders, setOpenOrders] = useState<{ [key: string]: boolean }>({});
  const { language } = useLanguage(); // Use global language context
  
  const toggleRow = (id: string) => {
    setOpenRow(openRow === id ? null : id);
  };

  const toggleOrder = (orderId: number) => {
    const key = orderId.toString();
    setOpenOrders((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCustomers = customer.filter(
    (entry) =>
      entry.name.toLowerCase().includes(searchText.toLowerCase()) ||
      entry.number.toString().includes(searchText.toLowerCase())
  );

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    const aId = Number(a.order_id ?? a.id) || 0;
    const bId = Number(b.order_id ?? b.id) || 0;
    return bId - aId;
  });

  const groupedCustomers = sortedCustomers.reduce((acc: any, curr) => {
    const id = curr.customers_id as string;
    if (!acc[id]) {
      acc[id] = {
        ...curr,
        orders: [],
      };
    }
    acc[id].orders.push(curr);
    return acc;
  }, {});

  const groupedList = Object.values(groupedCustomers);

  groupedList.sort((a: any, b: any) => {
    const aLatestOrder = a.orders[0]; 
    const bLatestOrder = b.orders[0];
    return (bLatestOrder.order_id || bLatestOrder.id) - (aLatestOrder.order_id || aLatestOrder.id);
  });

  // Multilingual texts
  const texts = {
    en: {
      suitNo: "Suit No",
      name: "Name",
      number: "Number",
      lastActivity: "Last Activity",
      customerInfo: "Customer Information",
      address: "Address",
      order: "Order",
      status: "Status",
      kameezLength: "Kameez Length",
      salwarLength: "Salwar Length",
      suitStyle: "Suit Style",
      chest: "Chest",
      waist: "Waist",
      shoulder: "Shoulder",
      asteen: "Asteen",
      collarStyle: "Collar Style",
      bottomWidth: "Bottom Width",
      salwarType: "Salwar Type",
      color: "Color",
      payment: "Payment",
      clothsNumber: "Cloths Number",
      basicPrice: "Basic Price",
      totalBill: "Total Bill",
      delivery: "Delivery",
      rowsPerPage: "Rows per page",
    },
    ur: {
      suitNo: "سوٹ نمبر",
      name: "نام",
      number: "نمبر",
      lastActivity: "آخری سرگرمی",
      customerInfo: "گاہک کی معلومات",
      address: "پتہ",
      order: "آرڈر",
      status: "حالت",
      kameezLength: "قمیض کی لمبائی",
      salwarLength: "شلوار کی لمبائی",
      suitStyle: "سوٹ کا انداز",
      chest: "چھاتی",
      waist: "کمر",
      shoulder: "کندھا",
      asteen: "آستین",
      collarStyle: "کالر کا انداز",
      bottomWidth: "گھیرا",
      salwarType: "شلوار کی قسم",
      color: "رنگ",
      payment: "ادائیگی",
      clothsNumber: "کپڑوں کی تعداد",
      basicPrice: "بنیادی قیمت",
      totalBill: "کل بل",
      delivery: "ڈلیوری",
      rowsPerPage: "فی صفحہ قطاریں",
    },
    hi: {
      suitNo: "सूट नंबर",
      name: "नाम",
      number: "नंबर",
      lastActivity: "अंतिम गतिविधि",
      customerInfo: "ग्राहक जानकारी",
      address: "पता",
      order: "ऑर्डर",
      status: "स्थिति",
      kameezLength: "कमीज की लंबाई",
      salwarLength: "सलवार की लंबाई",
      suitStyle: "सूट शैली",
      chest: "छाती",
      waist: "कमर",
      shoulder: "कंधा",
      asteen: "आस्तीन",
      collarStyle: "कॉलर शैली",
      bottomWidth: "घेरा",
      salwarType: "सलवार प्रकार",
      color: "रंग",
      payment: "भुगतान",
      clothsNumber: "कपड़ों की संख्या",
      basicPrice: "मूल कीमत",
      totalBill: "कुल बिल",
      delivery: "डिलीवरी",
      rowsPerPage: "प्रति पृष्ठ पंक्तियाँ",
    },
    ar: {
      suitNo: "رقم البدلة",
      name: "الاسم",
      number: "الرقم",
      lastActivity: "النشاط الأخير",
      customerInfo: "معلومات العميل",
      address: "العنوان",
      order: "طلب",
      status: "الحالة",
      kameezLength: "طول القميص",
      salwarLength: "طول الشلوار",
      suitStyle: "نمط البدلة",
      chest: "الصدر",
      waist: "الخصر",
      shoulder: "الكتف",
      asteen: "كم",
      collarStyle: "نمط الياقة",
      bottomWidth: "المحيط",
      salwarType: "نوع الشلوار",
      color: "لون",
      payment: "الدفع",
      clothsNumber: "عدد الملابس",
      basicPrice: "السعر الأساسي",
      totalBill: "الفاتورة الإجمالية",
      delivery: "التوصيل",
      rowsPerPage: "صفوف في الصفحة",
    },
    de: {
      suitNo: "Anzugnummer",
      name: "Name",
      number: "Nummer",
      lastActivity: "Letzte Aktivität",
      customerInfo: "Kundeninformation",
      address: "Adresse",
      order: "Bestellung",
      status: "Status",
      kameezLength: "Kameez Länge",
      salwarLength: "Salwar Länge",
      suitStyle: "Anzugstil",
      chest: "Brust",
      waist: "Taille",
      shoulder: "Schulter",
      asteen: "Ärmel",
      collarStyle: "Kragenstil",
      bottomWidth: "Umfang",
      salwarType: "Salwar Typ",
      color: "Farbe",
      payment: "Zahlung",
      clothsNumber: "Anzahl Kleider",
      basicPrice: "Grundpreis",
      totalBill: "Gesamtrechnung",
      delivery: "Lieferung",
      rowsPerPage: "Zeilen pro Seite",
    },
    fr: {
      suitNo: "Numéro de costume",
      name: "Nom",
      number: "Numéro",
      lastActivity: "Dernière activité",
      customerInfo: "Informations client",
      address: "Adresse",
      order: "Commande",
      status: "Statut",
      kameezLength: "Longueur Kameez",
      salwarLength: "Longueur Salwar",
      suitStyle: "Style de costume",
      chest: "Poitrine",
      waist: "Taille",
      shoulder: "Épaule",
      asteen: "Manche",
      collarStyle: "Style de col",
      bottomWidth: "Circonférence",
      salwarType: "Type Salwar",
      color: "Couleur",
      payment: "Paiement",
      clothsNumber: "Nombre vêtements",
      basicPrice: "Prix de base",
      totalBill: "Facture totale",
      delivery: "Livraison",
      rowsPerPage: "Lignes par page",
    },
    tr: {
      suitNo: "Takım No",
      name: "İsim",
      number: "Numara",
      lastActivity: "Son Aktivite",
      customerInfo: "Müşteri Bilgisi",
      address: "Adres",
      order: "Sipariş",
      status: "Durum",
      kameezLength: "Kamiz Uzunluğu",
      salwarLength: "Şalvar Uzunluğu",
      suitStyle: "Takım Stili",
      chest: "Göğüs",
      waist: "Bel",
      shoulder: "Omuz",
      asteen: "Kol",
      collarStyle: "Yaka Stili",
      bottomWidth: "Çevre",
      salwarType: "Şalvar Türü",
      color: "Renk",
      payment: "Ödeme",
      clothsNumber: "Kıyafet Sayısı",
      basicPrice: "Temel Fiyat",
      totalBill: "Toplam Fatura",
      delivery: "Teslimat",
      rowsPerPage: "Sayfa başına satır",
    }
  };

  const t = texts[language] || texts.en;

  // -------------------Apply pagination---------------
  const {
    currentData,
    currentPage,
    totalPages,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
  } = usePagination(groupedList, 5);

  return (
    <>
      <div className="overflow-x-auto rounded-sm">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 rounded-lg">
          <thead className="bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white text-sm uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left text-base font-semibold text-gray-900 rounded-tl-lg">
                {t.suitNo}
              </th>
              <th className="px-6 py-3 text-left text-base font-semibold text-gray-900">
                {t.name}
              </th>
              <th className="px-6 py-3 text-left text-base font-semibold text-gray-900">
                {t.number}
              </th>
              <th className="px-6 py-3 text-left text-base font-semibold text-gray-900 rounded-tr-lg">
                {t.lastActivity}
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y border divide-gray-200">
            {currentData.map((entry: any) => (
              <React.Fragment key={entry.customers_id}>
                {/* Main Row */}
                <tr
                  className="border-b dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => toggleRow(entry.customers_id)}
                >
                  <td className="px-6 py-4 text-sm md:text-base font-medium flex items-center space-x-2">
                    <span
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenRow(openRow === entry.customers_id ? null : entry.customers_id);
                      }}
                    >
                      {openRow === entry.customers_id ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                             fill="currentColor" className="w-5 h-5 text-orange-600">
                          <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                             fill="currentColor" className="w-5 h-5 text-green-600">
                          <path d="M8.75 3.75a.75.75 0 0 0-1.5 
                                0v3.5h-3.5a.75.75 0 0 0 0 
                                1.5h3.5v3.5a.75.75 0 0 0 
                                1.5 0v-3.5h3.5a.75.75 0 0 
                                0 0-1.5h-3.5v-3.5Z" />
                        </svg>
                      )}
                    </span>
                    {entry.orders.length} {language === 'ur' ? 'سوٹ' : language === 'hi' ? 'सूट' : language === 'ar' ? 'بدلة' : language === 'de' ? 'Anzüge' : language === 'fr' ? 'costumes' : language === 'tr' ? 'takım' : 'suits'}
                  </td>
                  <td className="px-6 py-4 text-sm md:text-base font-medium">
                    {entry.name}
                  </td>
                  <td className="px-6 py-4 text-sm md:text-base">
                    {entry.number}
                  </td>
                  <td className="px-6 py-4 text-sm md:text-base">
                    {entry.created_at}
                  </td>
                </tr>

                {/* Expanded Row */}
                {openRow === entry.customers_id && (
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <td colSpan={4} className="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm">
                      {/* User Info Section */}
                      <div className="mb-6 p-4 border rounded bg-white dark:bg-gray-700 shadow-sm">
                        <h3 className="font-medium text-lg text-gray-900 dark:text-white">{t.customerInfo}</h3>
                        <p><strong>{t.name}:</strong> {entry.name}</p>
                        <p><strong>{t.number}:</strong> {entry.number}</p>
                        <p><strong>{t.address}:</strong> {entry.address || 'N/A'}</p>
                      </div>

                      {/* Orders Stepper */}
                      <ol className="relative border-s border-green-300 text-gray-500 dark:text-gray-300">
                        {entry.orders.map((order: any, orderIndex: number) => (
                          <li key={order.order_id} className="mb-10 ms-6">
                            <span
                              className="absolute flex items-center justify-center w-8 h-8 
                                bg-green-300 rounded-full text-black -start-4 ring-4 ring-white dark:ring-gray-800 cursor-pointer"
                              onClick={() => toggleOrder(order.order_id)}
                            >
                              {orderIndex + 1}
                            </span>
                            <div className="flex items-center justify-between">
                              <h3
                                className="font-medium leading-tight cursor-pointer"
                                onClick={() => toggleOrder(order.order_id)}
                              >
                                {t.order} #{orderIndex + 1} — <span className={`px-2 py-1 rounded text-white ${order.status === "complete" ? "bg-green-500" : order.status === "is_preparing" ? "bg-yellow-500" : "bg-red-500"}`}>{order.status}</span>
                              </h3>
                            </div>
                            {openOrders[order.order_id.toString()] && (
                              <div className="p-4 border rounded bg-white dark:bg-gray-700 shadow-sm mt-3">
                                <p><strong>{t.kameezLength}:</strong> {order.kameez_length}</p>
                                <p><strong>{t.salwarLength}:</strong> {order.salwar_length}</p>
                                <p><strong>{t.suitStyle}:</strong> {order.suit_style}</p>
                                <p><strong>{t.chest}:</strong> {order.chest}</p>
                                <p><strong>{t.waist}:</strong> {order.waist}</p>
                                <p><strong>{t.shoulder}:</strong> {order.shoulder}</p>
                                <p><strong>{t.asteen}:</strong> {order.asteen}</p>
                                <p><strong>{t.collarStyle}:</strong> {order.collarstyle}</p>
                                <p><strong>{t.bottomWidth}:</strong> {order.bottomwidth}</p>
                                <p><strong>{t.salwarType}:</strong> {order.salwartype}</p>
                                <p><strong>{t.color}:</strong> {order.color}</p>
                                <p><strong>{t.payment}:</strong> {order.payment}</p>
                                <p><strong>{t.clothsNumber}:</strong> {order.clothsquantity}</p>
                                <p><strong>{t.basicPrice}:</strong> {order.basicPrice}</p>
                                <p><strong>{t.totalBill}:</strong> {order.totalBill}</p>
                                <p><strong>{t.delivery}:</strong> {order.delivery}</p>
                                <p><strong>{t.status}:</strong> {order.status}</p>
                              </div>
                            )}
                          </li>
                        ))}
                      </ol>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Controls - Outside the table */}
      {filteredCustomers.length > 0 && (
        <div className="flex items-center justify-between mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
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
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default UserHistoryTable;