"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const InvoicePrint = React.forwardRef<HTMLDivElement, { order: any }>(
  ({ order }, ref) => {
    const { language } = useLanguage();

    // Multilingual texts for InvoicePrint
    const texts = {
      en: {
        companyName: "Tailorix",
        tagline: "Custom Tailoring & Alterations",
        invoice: "INVOICE",
        billTo: "Bill To:",
        item: "Item",
        quantity: "Qty",
        rate: "Rate",
        amount: "Amount",
        total: "Total:",
        subtotal: "Sub Total:",
        advancePayment: "Advance Payment:",
        remainingPayment: "Remaining Payment:",
        paymentStatus: "Payment Status:",
        paid: "Paid",
        pending: "Pending",
        thankYou: "Thank you for your business!",
        notes: "Notes:",
        paymentTerms: "Please pay remaining amount on delivery"
      },
      ur: {
        companyName: "Tailorix",
        tagline: "Custom Tailoring & Alterations",
        invoice: "انوائس",
        billTo: "بل بھیجیں:",
        item: "آئٹم",
        quantity: "مقدار",
        rate: "شرح",
        amount: "رقم",
        total: "کل:",
        subtotal: "Sub Total:",
        advancePayment: "ایڈوانس ادائیگی:",
        remainingPayment: "بقیہ ادائیگی:",
        paymentStatus: "ادائیگی کی حیثیت:",
        paid: "ادا شدہ",
        pending: "زیر التواء",
        thankYou: "آپ کے کاروبار کا شکریہ!",
        notes: "نوٹس:",
        paymentTerms: "براہ کرم بقیہ رقم ڈیلیوری پر ادا کریں"
      },
      hi: {
        companyName: "Tailorix",
        tagline: "Custom Tailoring & Alterations",
        invoice: "चालान",
        billTo: "बिल टू:",
        item: "आइटम",
        quantity: "मात्रा",
        rate: "दर",
        amount: "राशि",
        total: "कुल:",
        subtotal: "Sub Total:",
        advancePayment: "अग्रिम भुगतान:",
        remainingPayment: "शेष भुगतान:",
        paymentStatus: "भुगतान स्थिति:",
        paid: "चुकाया गया",
        pending: "लंबित",
        thankYou: "आपके व्यवसाय के लिए धन्यवाद!",
        notes: "नोट्स:",
        paymentTerms: "कृपया शेष राशि डिलीवरी पर चुकाएं"
      },
      ar: {
        companyName: "Tailorix",
        tagline: "Custom Tailoring & Alterations",
        invoice: "فاتورة",
        billTo: "فاتورة إلى:",
        item: "البند",
        quantity: "الكمية",
        rate: "المعدل",
        amount: "المبلغ",
        total: "الإجمالي:",
        subtotal: "Sub Total:",
        advancePayment: "الدفعة المقدمة:",
        remainingPayment: "الدفعة المتبقية:",
        paymentStatus: "حالة الدفع:",
        paid: "مدفوع",
        pending: "قيد الانتظار",
        thankYou: "شكرا لعملك!",
        notes: "ملاحظات:",
        paymentTerms: "يرجى دفع المبلغ المتبقي عند التسليم"
      },
      de: {
        companyName: "Tailorix",
        tagline: "Custom Tailoring & Alterations",
        invoice: "RECHNUNG",
        billTo: "Rechnung an:",
        item: "Artikel",
        quantity: "Menge",
        rate: "Preis",
        amount: "Betrag",
        total: "Gesamt:",
        subtotal: "Sub Total:",
        advancePayment: "Anzahlung:",
        remainingPayment: "Restzahlung:",
        paymentStatus: "Zahlungsstatus:",
        paid: "Bezahlt",
        pending: "Ausstehend",
        thankYou: "Vielen Dank für Ihren Auftrag!",
        notes: "Notizen:",
        paymentTerms: "Bitte zahlen Sie den Restbetrag bei Lieferung"
      },
      fr: {
        companyName: "Tailorix",
        tagline: "Custom Tailoring & Alterations",
        invoice: "FACTURE",
        billTo: "Facturer à:",
        item: "Article",
        quantity: "Qté",
        rate: "Taux",
        amount: "Montant",
        total: "Total:",
        subtotal: "Sub Total:",
        advancePayment: "Paiement d'avance:",
        remainingPayment: "Paiement restant:",
        paymentStatus: "Statut du paiement:",
        paid: "Payé",
        pending: "En attente",
        thankYou: "Merci pour votre commande!",
        notes: "Notes:",
        paymentTerms: "Veuillez payer le montant restant à la livraison"
      },
      tr: {
        companyName: "Tailorix",
        tagline: "Custom Tailoring & Alterations",
        invoice: "FATURA",
        billTo: "Fatura Edilecek:",
        item: "Kalem",
        quantity: "Miktar",
        rate: "Oran",
        amount: "Tutar",
        total: "Toplam:",
        subtotal: "Sub Total:",
        advancePayment: "Avans Ödemesi:",
        remainingPayment: "Kalan Ödeme:",
        paymentStatus: "Ödeme Durumu:",
        paid: "Ödendi",
        pending: "Beklemede",
        thankYou: "İşiniz için teşekkürler!",
        notes: "Notlar:",
        paymentTerms: "Lütfen kalan tutarı teslimatta ödeyin"
      }
    };

    const t = texts[language] || texts.en;

    return (
      <div
        ref={ref}
        className="invoice-container max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{t.companyName}</h1>
            <p className="text-sm text-gray-500">{t.tagline}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold text-gray-700">{t.invoice}</h2>
            <p className="text-sm text-gray-500">Phone: {order.number}</p>
            <p className="text-sm text-gray-500">
              {order.created_at ? new Date(order.created_at).toLocaleDateString() : new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">{t.billTo}</h3>
            <p className="text-gray-600 font-medium">{order.name}</p>
            <p className="text-gray-600">{order.address}</p>
          </div>
          <div className="text-right">
            <h3 className="text-sm font-semibold text-gray-700">Order Details</h3>
            <p className="text-gray-600">Style: {order.suit_style}</p>
            <p className="text-gray-600">Color: {order.color}</p>
            <p className="text-gray-600">Delivery: {order.delivery_date ? new Date(order.delivery_date).toLocaleDateString() : 'Not set'}</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">{t.item}</th>
                <th className="border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">{t.quantity}</th>
                <th className="border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">{t.rate}</th>
                <th className="border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">{t.amount}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 text-gray-600">{order.suit_style || "Suit"}</td>
                <td className="border px-4 py-2 text-gray-600 text-center">{order.clothsquantity || "1"}</td>
                <td className="border px-4 py-2 text-gray-600 text-right">₹{order.basicPrice || "0"}</td>
                <td className="border px-4 py-2 text-gray-600 text-right">₹{order.totalBill}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Details */}
        <div className="flex justify-end">
          <div className="w-1/2">
            <div className="flex justify-between py-2 border-b">
              <span className="font-semibold text-gray-700">{t.total}</span>
              <span className="font-semibold text-gray-800">₹{order.totalBill}</span>
            </div>
            
            {/* ✅ FIX: Show advance and remaining payment only for advance payment method */}
            
              <>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold text-gray-700">{t.advancePayment}</span>
                  <span className="text-green-600 font-semibold">₹{order.advanceAmount}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold text-gray-700">{t.remainingPayment}</span>
                <span className="text-orange-600 font-semibold">₹{order.remeaningAmount}</span>
              </div>
               <div className="flex justify-between py-2 border-b">
              <span className="font-semibold text-gray-700">{t.subtotal}</span>
              <span className="font-semibold text-gray-800">₹{order.totalBill}</span>
            </div>
              </>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t">
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">{t.notes}</h4>
            <p className="text-sm text-gray-600">
              {order.notes || "Please check all measurements before delivery. Any alterations after delivery may incur additional charges."}
            </p>
          </div>
          
          <p className="text-center text-gray-600 mb-2 font-medium">{t.thankYou}</p>
          
        </div>

        {/* Order ID Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Order ID: {order.id || order.number} | Printed on: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  }
);

InvoicePrint.displayName = "InvoicePrint";
export default InvoicePrint;