'use client'
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const PrintContent = React.forwardRef<HTMLDivElement, { order: any }>(
  ({ order }, ref) => {
    const { language } = useLanguage();

    // Multilingual texts for PrintContent
    const texts = {
      en: {
        title: "Customer Cloth Details",
        name: "Name",
        number: "Number",
        address: "Address",
        kameezLength: "Kameez Length",
        salwarLength: "Salwar Length",
        suitStyle: "Suit Style",
        neckSize: "Neck Size",
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
        status: "Status",
        notAvailable: "N/A"
      },
      ur: {
        title: "گاہک کے کپڑے کی تفصیلات",
        name: "نام",
        number: "نمبر",
        address: "پتہ",
        kameezLength: "قمیض کی لمبائی",
        salwarLength: "شلوار کی لمبائی",
        suitStyle: "سوٹ کا انداز",
        neckSize: "گردن کا سائز",
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
        status: "حالت",
        notAvailable: "دستیاب نہیں"
      },
      hi: {
        title: "ग्राहक कपड़ा विवरण",
        name: "नाम",
        number: "नंबर",
        address: "पता",
        kameezLength: "कमीज की लंबाई",
        salwarLength: "सलवार की लंबाई",
        suitStyle: "सूट शैली",
        neckSize: "गर्दन का आकार",
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
        status: "स्थिति",
        notAvailable: "उपलब्ध नहीं"
      },
      ar: {
        title: "تفاصيل قماش العميل",
        name: "الاسم",
        number: "الرقم",
        address: "العنوان",
        kameezLength: "طول القميص",
        salwarLength: "طول الشلوار",
        suitStyle: "نمط البدلة",
        neckSize: "مقاس الرقبة",
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
        status: "الحالة",
        notAvailable: "غير متوفر"
      },
      de: {
        title: "Kundenstoffdetails",
        name: "Name",
        number: "Nummer",
        address: "Adresse",
        kameezLength: "Kameez Länge",
        salwarLength: "Salwar Länge",
        suitStyle: "Anzugstil",
        neckSize: "Halsweite",
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
        status: "Status",
        notAvailable: "Nicht verfügbar"
      },
      fr: {
        title: "Détails du tissu client",
        name: "Nom",
        number: "Numéro",
        address: "Adresse",
        kameezLength: "Longueur Kameez",
        salwarLength: "Longueur Salwar",
        suitStyle: "Style de costume",
        neckSize: "Tour de cou",
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
        status: "Statut",
        notAvailable: "Non disponible"
      },
      tr: {
        title: "Müşteri Kumaş Detayları",
        name: "İsim",
        number: "Numara",
        address: "Adres",
        kameezLength: "Kamiz Uzunluğu",
        salwarLength: "Şalvar Uzunluğu",
        suitStyle: "Takım Stili",
        neckSize: "Boyun Ölçüsü",
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
        status: "Durum",
        notAvailable: "Mevcut değil"
      }
    };

    const t = texts[language] || texts.en;

    return (
      <div ref={ref} className="p-4" style={{ fontFamily: "Arial, sans-serif" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}>
          {t.title}
        </h2>
        <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "5px" }}>
          <p><strong>{t.name}:</strong> {order.name}</p>
          <p><strong>{t.number}:</strong> {order.number}</p>
          <p><strong>{t.address}:</strong> {order.address || t.notAvailable}</p>
          <p><strong>{t.kameezLength}:</strong> {order.kameez_length || t.notAvailable}</p>
          <p><strong>{t.salwarLength}:</strong> {order.salwar_length || t.notAvailable}</p>
          <p><strong>{t.suitStyle}:</strong> {order.suit_style || t.notAvailable}</p>
          <p><strong>{t.neckSize}:</strong> {order.neck_size || t.notAvailable}</p>
          <p><strong>{t.chest}:</strong> {order.chest || t.notAvailable}</p>
          <p><strong>{t.waist}:</strong> {order.waist || t.notAvailable}</p>
          <p><strong>{t.shoulder}:</strong> {order.shoulder || t.notAvailable}</p>
          <p><strong>{t.asteen}:</strong> {order.asteen || t.notAvailable}</p>
          <p><strong>{t.collarStyle}:</strong> {order.collarstyle || t.notAvailable}</p>
          <p><strong>{t.bottomWidth}:</strong> {order.bottomwidth || t.notAvailable}</p>
          <p><strong>{t.salwarType}:</strong> {order.salwartype || t.notAvailable}</p>
          <p><strong>{t.color}:</strong> {order.color || t.notAvailable}</p>
          <p><strong>{t.payment}:</strong> {order.payment || t.notAvailable}</p>
          <p><strong>{t.clothsNumber}:</strong> {order.clothsquantity || t.notAvailable}</p>
          <p><strong>{t.basicPrice}:</strong> {order.basicPrice || t.notAvailable}</p>
          <p><strong>{t.totalBill}:</strong> {order.totalBill || t.notAvailable}</p>
          <p><strong>{t.delivery}:</strong> {order.delivery || t.notAvailable}</p>
          <p><strong>{t.status}:</strong> {order.status || t.notAvailable}</p>
        </div>
      </div>
    );
  }
);

PrintContent.displayName = "PrintContent";

export default PrintContent;