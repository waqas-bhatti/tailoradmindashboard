import z from "zod";
import { userDetailSchema } from "@/app/schemas/AddNewSchema";

type FormData = z.infer<typeof userDetailSchema>;

export interface FormField {
  name: keyof FormData;
  labelEn: string;
  labelUr: string;
  labelHi: string;
  labelAr: string;
  labelDe: string;
  labelFr: string;
  labelTr: string;
  placeholder?: string;
  type?: "text" | "select" | "date" | "selectOrText";
  options?: {
    value: string;
    labelEn: string;
    labelUr: string;
    labelHi: string;
    labelAr: string;
    labelDe: string;
    labelFr: string;
    labelTr: string;
  }[];
}

// Supported languages
export type Language = "en" | "ur" | "hi" | "ar" | "de" | "fr" | "tr";

// Language names for display
export const languageNames: Record<Language, string> = {
  en: "English",
  ur: "اردو",
  hi: "हिन्दी",
  ar: "العربية",
  de: "Deutsch",
  fr: "Français",
  tr: "Türkçe",
};

// ✅ 1st Section: Personal Information
export const personalInfoFields: FormField[] = [
  {
    name: "name",
    labelEn: "Name",
    labelUr: "صارف کا نام",
    labelHi: "नाम",
    labelAr: "الاسم",
    labelDe: "Name",
    labelFr: "Nom",
    labelTr: "İsim",
    placeholder: "Enter username",
    type: "text",
  },
  {
    name: "number",
    labelEn: "Number",
    labelUr: "نمبر",
    labelHi: "नंबर",
    labelAr: "رقم",
    labelDe: "Nummer",
    labelFr: "Numéro",
    labelTr: "Numara",
    placeholder: "Enter number",
    type: "text",
  },
  {
    name: "address",
    labelEn: "Address",
    labelUr: "پتہ",
    labelHi: "पता",
    labelAr: "عنوان",
    labelDe: "Adresse",
    labelFr: "Adresse",
    labelTr: "Adres",
    placeholder: "Enter Address",
    type: "text",
  },
];

// ✅ 2nd Section: Clothes Details
export const clothesDetailFields: FormField[] = [
  {
    name: "suit_style",
    labelEn: "Cloth Style",
    labelUr: "سوٹ کا انداز",
    labelHi: "सूट शैली",
    labelAr: "نمط البدلة",
    labelDe: "Anzugstil",
    labelFr: "Style de costume",
    labelTr: "Takım Stili",
    placeholder: "Select Suit Style",
    type: "select",
    options: [
      {
        value: "Shalwar Kameez",
        labelEn: "Pant Shirt",
        labelUr: "شلوار قمیض",
        labelHi: "शलवार कमीज",
        labelAr: "ثَوْب",
        labelDe: "Lederhosen",
        labelFr: "Marinière",
        labelTr: "Kaftan",
      },
      {
        value: "Waistcoat Suit",
        labelEn: "Waistcoat Suit",
        labelUr: "ویسکٹ سوٹ",
        labelHi: "वेस्टकोट सूट",
        labelAr: "لا تستخدم",
        labelDe: "Nicht verwenden",
        labelFr: "Ne pas utiliser",
        labelTr: "Kullanmayın",
      },
      {
        value: "Prince Coat",
        labelEn: "Prince Coat",
        labelUr: "پرنس کوٹ",
        labelHi: "वेस्टकोट सूट",
        labelAr: "لا تستخدم",
        labelDe: "Nicht verwenden",
        labelFr: "Ne pas utiliser",
        labelTr: "Kullanmayın",
      },
      {
        value: "Sherwani",
        labelEn: "",
        labelUr: "شیروانی",
        labelHi: "शेरवानी",
        labelAr: "❌لا تستخدم❌",
        labelDe: "❌Nicht verwenden❌",
        labelFr: "❌Ne pas utiliser",
        labelTr: "❌Kullanmayın❌",
      },
      {
        value: "Kurta Pajama",
        labelEn: "❌Not use ❌",
        labelUr: "کرتا پاجامہ",
        labelHi: "उपयोग न करें",
        labelAr: "❌لا تستخدم❌",
        labelDe: "❌Nicht verwenden❌",
        labelFr: "❌Ne pas utiliser",
        labelTr: "❌Kullanmayın❌",
      },
      {
        value: "Pathani Suit",
        labelEn: "❌Not use ❌",
        labelUr: "پٹھانی سوٹ",
        labelHi: "❌उपयोग न करें ❌",
        labelAr: "❌لا تستخدم❌",
        labelDe: "❌Nicht verwenden❌",
        labelFr: "❌Ne pas utiliser",
        labelTr: "❌Kullanmayın❌",
      },

      {
        value: "Sindhi Suit",
        labelEn: "❌Not use ❌",
        labelUr: "سندھی سوٹ",
        labelHi: "❌उपयोग न करें ❌",
        labelAr: "❌لا تستخدم❌",
        labelDe: "❌Nicht verwenden❌",
        labelFr: "❌Ne pas utiliser",
        labelTr: "❌Kullanmayın❌",
      },
      {
        value: "Balochi Suit",
        labelEn: "❌Not use ❌",
        labelUr: "بلوچی سوٹ",
        labelHi: "❌उपयोग न करें ❌",
        labelAr: "❌لا تستخدم❌",
        labelDe: "❌Nicht verwenden❌",
        labelFr: "❌Ne pas utiliser",
        labelTr: "❌Kullanmayın❌",
      },
    ],
  },
  {
    name: "kameez_length",
    labelEn: "Shirt Length",
    labelUr: "قمیض کی لمبائی",
    labelHi: "कमीज़ की लंबाई",
    labelAr: "طول القميص",
    labelDe: "Hemdlänge",
    labelFr: "Longueur de la chemise",
    labelTr: "Gömlek boyu",
    placeholder: "Enter Kameez Length",
    type: "text",
  },
  {
    name: "salwar_length",
    labelEn: "Pant Length",
    labelUr: "شلوار کی لمبائی",
    labelHi: "सलवार की लंबाई",
    labelAr: "بنطال",
    labelDe: "Hose Länge",
    labelFr: "Pantalon Longueur",
    labelTr: "Pantolon Uzunluğu",
    placeholder: "Enter Salwar Length",
    type: "text",
  },
  {
    name: "bazo_length",
    labelEn: "Arm Length",
    labelUr: "بازو",
    labelHi: "बाज़ू की लंबाई",
    labelAr: "طول الذراع",
    labelDe: "Armlänge ",
    labelFr: "Longueur de bras",
    labelTr: "Kol uzunluğu",
    placeholder: "Enter Bazo Length",
    type: "text",
  },
  {
    name: "neck_size",
    labelEn: "Neck Size",
    labelUr: "گردن",
    labelHi: "गर्दन का आकार",
    labelAr: "مقاس الرقبة",
    labelDe: "Halsgröße",
    labelFr: "Taille du cou",
    labelTr: "Boyun Ölçüsü",
    placeholder: "Enter Neck size",
    type: "text",
  },
  {
    name: "chest",
    labelEn: "Chest",
    labelUr: "چھاتی",
    labelHi: "छाती",
    labelAr: "الصدر",
    labelDe: "Brust",
    labelFr: "Poitrine",
    labelTr: "Göğüs",
    placeholder: "Enter chest",
    type: "text",
  },
  {
    name: "asteen",
    labelEn: "Sleeve",
    labelUr: "آستین",
    labelHi: "आस्तीन",
    labelAr: "كم",
    labelDe: "Ärmel",
    labelFr: "Manche",
    labelTr: "Kol",
    placeholder: "Enter chest",
    type: "text",
  },
  {
    name: "waist",
    labelEn: "Waist",
    labelUr: "کمر",
    labelHi: "कमर",
    labelAr: "الخصر",
    labelDe: "Taille",
    labelFr: "Taille",
    labelTr: "Bel",
    placeholder: "Enter waist",
    type: "text",
  },
  {
    name: "shoulder",
    labelEn: "Shoulder",
    labelUr: "کندھا",
    labelHi: "कंधा",
    labelAr: "الكتف",
    labelDe: "Schulter",
    labelFr: "Épaule",
    labelTr: "Omuz",
    placeholder: "Enter shoulder",
    type: "text",
  },
  {
    name: "collarstyle",
    labelEn: "Collar Style",
    labelUr: "کالر کا انداز",
    labelHi: "कॉलर शैली",
    labelAr: "نمط الياقة",
    labelDe: "Kragenstil",
    labelFr: "Style de col",
    labelTr: "Yaka Stili",
    placeholder: "Enter Collar Style",
    type: "select",
    options: [
      {
        value: "bane",
        labelEn: "Bane",
        labelUr: "بین",
        labelHi: "बेन",
        labelAr: "بان",
        labelDe: "Bane",
        labelFr: "Bane",
        labelTr: "Bane",
      },
      {
        value: "collar",
        labelEn: "Collar",
        labelUr: "کالر",
        labelHi: "कॉलर",
        labelAr: "ياقة",
        labelDe: "Kragen",
        labelFr: "Col",
        labelTr: "Yaka",
      },
    ],
  },
  {
    name: "bottomwidth",
    labelEn: "Pleat",
    labelUr: "گھیرا",
    labelHi: "घेरा",
    labelAr: "محيط",
    labelDe: "Umfang",
    labelFr: "Circonférence",
    labelTr: "Çevre",
    placeholder: "Enter Bottom Width",
    type: "select",
    options: [
      {
        value: "gool",
        labelEn: "Gool",
        labelUr: "گول",
        labelHi: "गोल",
        labelAr: "مدور",
        labelDe: "Rund",
        labelFr: "Rond",
        labelTr: "Yuvarlak",
      },
      {
        value: "chora",
        labelEn: "Chora",
        labelUr: "چوڑا",
        labelHi: "चौड़ा",
        labelAr: "واسع",
        labelDe: "Breit",
        labelFr: "Large",
        labelTr: "Geniş",
      },
    ],
  },
  {
    name: "salwartype",
    labelEn: "Pant Type",
    labelUr: "شلوار کی قسم",
    labelHi: "सलवार प्रकार",
    labelAr: "بنطال",
    labelDe: "Hose Typ",
    labelFr: "Pantalon Salwar",
    labelTr: "Pantalon Türü",
    placeholder: "Enter Salwar Type",
    type: "select",
    options: [
      {
        value: "sada",
        labelEn: "Simple",
        labelUr: "سادہ",
        labelHi: "सादा",
        labelAr: "بسيط",
        labelDe: "Einfach",
        labelFr: "Simple",
        labelTr: "Basit",
      },
      {
        value: "traozar",
        labelEn: "Traozar",
        labelUr: "ٹراوزر",
        labelHi: "ट्राउज़र",
        labelAr: "بنطلون",
        labelDe: "Hose",
        labelFr: "Pantalon",
        labelTr: "Pantolon",
      },
      {
        value: "pajama_blochi",
        labelEn: "❌ Not use ❌",
        labelUr: "پاجامہ",
        labelHi: "❌उपयोग न करें❌",
        labelAr: "❌لا تستخدم❌",
        labelDe: "❌Nicht verwenden❌",
        labelFr: "❌Ne pas utiliser",
        labelTr: "❌Kullanmayın❌",
      },

      {
        value: "blochi",
        labelEn: "❌Not use ❌",
        labelUr: "بلوچی",
        labelHi: "❌उपयोग न करें❌",
        labelAr: "❌لا تستخدم❌",
        labelDe: "❌Nicht verwenden❌",
        labelFr: "❌Ne pas utiliser",
        labelTr: "❌Kullanmayın❌",
      },
      {
        value: "sindi",
        labelEn: "❌Not use ❌",
        labelUr: "سندھی",
        labelHi: "❌उपयोग न करें❌",
        labelAr: "❌لا تستخدم❌",
        labelDe: "❌Nicht verwenden❌",
        labelFr: "❌Ne pas utiliser",
        labelTr: "❌Kullanmayın❌",
      },
    ],
  },
  {
    name: "color",
    labelEn: "Cloth Color",
    labelUr: "سوٹ کا رنگ",
    labelHi: "सूट का रंग",
    labelAr: "لون البدلة",
    labelDe: "Anzugfarbe",
    labelFr: "Couleur costume",
    labelTr: "Takım Rengi",
    placeholder: "Enter Suit Color",
    type: "text",
  },
  {
    name: "clothsquantity",
    labelEn: "Clothes Number",
    labelUr: "کپڑوں کی تعداد",
    labelHi: "कपड़ों की संख्या",
    labelAr: "عدد الملابس",
    labelDe: "Anzahl Kleider",
    labelFr: "Nombre vêtements",
    labelTr: "Kıyafet Sayısı",
    placeholder: "Enter Number of Clothes",
    type: "text",
  },
];

// ✅ 3rd Section: Tailor/Admin Only
export const tailorAdminFields: FormField[] = [
  {
    name: "payment",
    labelEn: "Payment",
    labelUr: "ادائیگی",
    labelHi: "भुगतान",
    labelAr: "الدفع",
    labelDe: "Zahlung",
    labelFr: "Paiement",
    labelTr: "Ödeme",
    type: "select",
    options: [
      {
        value: "advance",
        labelEn: "Advance",
        labelUr: "ایڈوانس",
        labelHi: "अग्रिम",
        labelAr: "مقدّم",
        labelDe: "Voraus",
        labelFr: "Avance",
        labelTr: "Avans",
      },
      {
        value: "after",
        labelEn: "After",
        labelUr: "بعد",
        labelHi: "बाद में",
        labelAr: "بعد",
        labelDe: "Nachher",
        labelFr: "Après",
        labelTr: "Sonra",
      },
    ],
  },
  // ✅ ADD THESE NEW FIELDS FOR ADVANCE PAYMENT
  {
    name: "advanceAmount",
    labelEn: "Advance Amount",
    labelUr: "ایڈوانس رقم",
    labelHi: "अग्रिम राशि",
    labelAr: "المبلغ المقدم",
    labelDe: "Anzahlungsbetrag",
    labelFr: "Montant d'acompte",
    labelTr: "Avans Miktarı",
    placeholder: "Enter advance amount",
    type: "text",
  },
  {
    name: "remeaningAmount",
    labelEn: "Remaining Amount",
    labelUr: "بقیہ رقم",
    labelHi: "शेष राशि",
    labelAr: "المبلغ المتبقي",
    labelDe: "Restbetrag",
    labelFr: "Montant restant",
    labelTr: "Kalan Miktar",
    placeholder: "Remaining amount",
    type: "text",
  },
  {
    name: "basicPrice",
    labelEn: "Cloth Basic Price",
    labelUr: "کپڑے کی قیمت",
    labelHi: "कपड़े की मूल कीमत",
    labelAr: "سعر القماش",
    labelDe: "Stoffgrundpreis",
    labelFr: "Prix de base tissu",
    labelTr: "Kumaş Temel Fiyatı",
    type: "selectOrText",
    placeholder: "Enter or select price",
    options: [
      {
        value: "2000",
        labelEn: "2000 PKR",
        labelUr: "2000 روپے",
        labelHi: "2000 रुपये",
        labelAr: "2000 روبية",
        labelDe: "2000 PKR",
        labelFr: "2000 PKR",
        labelTr: "2000 PKR",
      },
      {
        value: "2500",
        labelEn: "2500 PKR",
        labelUr: "2500 روپے",
        labelHi: "2500 रुपये",
        labelAr: "2500 روبية",
        labelDe: "2500 PKR",
        labelFr: "2500 PKR",
        labelTr: "2500 PKR",
      },
      {
        value: "3000",
        labelEn: "3000 PKR",
        labelUr: "3000 روپے",
        labelHi: "3000 रुपये",
        labelAr: "3000 روبية",
        labelDe: "3000 PKR",
        labelFr: "3000 PKR",
        labelTr: "3000 PKR",
      },
      {
        value: "custom",
        labelEn: "Custom Price",
        labelUr: "اپنی مرضی کی قیمت",
        labelHi: "कस्टम कीमत",
        labelAr: "سعر مخصص",
        labelDe: "Benutzerdefinierter Preis",
        labelFr: "Prix personnalisé",
        labelTr: "Özel Fiyat",
      },
    ],
  },
  {
    name: "totalBill",
    labelEn: "Total Bill",
    labelUr: "کل بل",
    labelHi: "कुल बिल",
    labelAr: "الفاتورة الإجمالية",
    labelDe: "Gesamtrechnung",
    labelFr: "Facture totale",
    labelTr: "Toplam Fatura",
    placeholder: "Enter Price",
    type: "text",
  },
  {
    name: "delivery",
    labelEn: "Delivery",
    labelUr: "ڈلیوری",
    labelHi: "डिलीवरी",
    labelAr: "التوصيل",
    labelDe: "Lieferung",
    labelFr: "Livraison",
    labelTr: "Teslimat",
    type: "select",
    options: [
      {
        value: "home",
        labelEn: "Home",
        labelUr: "گھر",
        labelHi: "घर",
        labelAr: "المنزل",
        labelDe: "Zuhause",
        labelFr: "Domicile",
        labelTr: "Ev",
      },
      {
        value: "pickup",
        labelEn: "Pickup",
        labelUr: "پک اپ",
        labelHi: "पिकअप",
        labelAr: "استلام",
        labelDe: "Abholung",
        labelFr: "Ramassage",
        labelTr: "Alım",
      },
    ],
  },
  {
    name: "delivery_date",
    labelEn: "Delivery Date",
    labelUr: "ڈلیوری کی تاریخ",
    labelHi: "डिलीवरी तारीख",
    labelAr: "تاريخ التوصيل",
    labelDe: "Lieferdatum",
    labelFr: "Date de livraison",
    labelTr: "Teslimat Tarihi",
    type: "date",
    placeholder: "YYYY-MM-DD",
  },
];

// Helper function to get label based on language
export const getLabel = (field: FormField, language: Language): string => {
  switch (language) {
    case "ur":
      return field.labelUr;
    case "hi":
      return field.labelHi;
    case "ar":
      return field.labelAr;
    case "de":
      return field.labelDe;
    case "fr":
      return field.labelFr;
    case "tr":
      return field.labelTr;
    default:
      return field.labelEn;
  }
};

// Helper function to get option label based on language
export const getOptionLabel = (option: any, language: Language): string => {
  switch (language) {
    case "ur":
      return option.labelUr;
    case "hi":
      return option.labelHi;
    case "ar":
      return option.labelAr;
    case "de":
      return option.labelDe;
    case "fr":
      return option.labelFr;
    case "tr":
      return option.labelTr;
    default:
      return option.labelEn;
  }
};

// Get placeholder text based on language
export const getPlaceholder = (
  language: Language,
  customPlaceholder?: string
): string => {
  if (customPlaceholder) return customPlaceholder;

  switch (language) {
    case "ur":
      return "اختیار منتخب کریں";
    case "hi":
      return "विकल्प चुनें";
    case "ar":
      return "اختر الخيار";
    case "de":
      return "Option wählen";
    case "fr":
      return "Choisir une option";
    case "tr":
      return "Seçenek seçin";
    default:
      return "Select an option";
  }
};

// Section titles in different languages
export const getSectionTitle = (
  section: string,
  language: Language
): string => {
  const titles: Record<string, Record<Language, string>> = {
    personal: {
      en: "Personal Information",
      ur: "ذاتی معلومات",
      hi: "व्यक्तिगत जानकारी",
      ar: "المعلومات الشخصية",
      de: "Persönliche Informationen",
      fr: "Informations personnelles",
      tr: "Kişisel Bilgiler",
    },
    clothes: {
      en: "Clothes Detail",
      ur: "کپڑوں کی تفصیل",
      hi: "कपड़ों का विवरण",
      ar: "تفاصيل الملابس",
      de: "Kleidungsdetails",
      fr: "Détails vêtements",
      tr: "Kıyafet Detayları",
    },
    tailor: {
      en: "Tailor Use Only",
      ur: "درزی کے استعمال کے لیے",
      hi: "केवल दर्जी उपयोग",
      ar: "للاستخدام الخياط فقط",
      de: "Nur für Schneider",
      fr: "Usage tailleur uniquement",
      tr: "Yalnızca Terzi Kullanımı",
    },
  };

  return titles[section]?.[language] || section;
};

// Button texts in different languages
export const getButtonText = (key: string, language: Language): string => {
  const texts: Record<string, Record<Language, string>> = {
    cancel: {
      en: "Cancel",
      ur: "منسوخ کریں",
      hi: "रद्द करें",
      ar: "إلغاء",
      de: "Abbrechen",
      fr: "Annuler",
      tr: "İptal",
    },
    update: {
      en: "Update",
      ur: "اپ ڈیٹ کریں",
      hi: "अपडेट करें",
      ar: "تحديث",
      de: "Aktualisieren",
      fr: "Mettre à jour",
      tr: "Güncelle",
    },
    add: {
      en: "Add",
      ur: "شامل کریں",
      hi: "जोड़ें",
      ar: "إضافة",
      de: "Hinzufügen",
      fr: "Ajouter",
      tr: "Ekle",
    },
    updating: {
      en: "Updating...",
      ur: "اپ ڈیٹ ہو رہا ہے...",
      hi: "अपडेट हो रहा है...",
      ar: "جاري التحديث...",
      de: "Wird aktualisiert...",
      fr: "Mise à jour...",
      tr: "Güncelleniyor...",
    },
    saving: {
      en: "Saving...",
      ur: "محفوظ ہو رہا ہے...",
      hi: "सेव हो रहा है...",
      ar: "جاري الحفظ...",
      de: "Wird gespeichert...",
      fr: "Enregistrement...",
      tr: "Kaydediliyor...",
    },
  };

  return texts[key]?.[language] || key;
};

// Existing customer message in different languages
export const getExistingCustomerMessage = (
  customer: any,
  language: Language
): { message: string; button: string } => {
  const messages = {
    en: {
      message: `Customer <strong>${customer.name}</strong> with number <strong>${customer.number}</strong> already exists.`,
      button: "Use this customer's details",
    },
    ur: {
      message: `گاہک <strong>${customer.name}</strong> نمبر کے ساتھ <strong>${customer.number}</strong> پہلے سے موجود ہے۔`,
      button: "اس گاہک کی تفصیلات استعمال کریں",
    },
    hi: {
      message: `ग्राहक <strong>${customer.name}</strong> नंबर <strong>${customer.number}</strong> पहले से मौजूद है।`,
      button: "इस ग्राहक का विवरण उपयोग करें",
    },
    ar: {
      message: `العميل <strong>${customer.name}</strong> بالرقم <strong>${customer.number}</strong> موجود مسبقاً.`,
      button: "استخدم تفاصيل هذا العميل",
    },
    de: {
      message: `Kunde <strong>${customer.name}</strong> mit Nummer <strong>${customer.number}</strong> existiert bereits.`,
      button: "Kundendetails verwenden",
    },
    fr: {
      message: `Client <strong>${customer.name}</strong> avec le numéro <strong>${customer.number}</strong> existe déjà.`,
      button: "Utiliser ces détails client",
    },
    tr: {
      message: `<strong>${customer.name}</strong> isimli müşteri <strong>${customer.number}</strong> numarası ile zaten mevcut.`,
      button: "Bu müşteri detaylarını kullan",
    },
  };

  return messages[language] || messages.en;
};

// Customer Preview Fields with all languages
export const previewFields: {
  label: string;
  value: keyof FormData;
  labelEn: string;
  labelUr: string;
  labelHi: string;
  labelAr: string;
  labelDe: string;
  labelFr: string;
  labelTr: string;
}[] = [
  {
    label: "Name",
    value: "name",
    labelEn: "Name",
    labelUr: "نام",
    labelHi: "नाम",
    labelAr: "الاسم",
    labelDe: "Name",
    labelFr: "Nom",
    labelTr: "İsim",
  },
  {
    label: "Address",
    value: "address",
    labelEn: "Address",
    labelUr: "پتہ",
    labelHi: "पता",
    labelAr: "عنوان",
    labelDe: "Adresse",
    labelFr: "Adresse",
    labelTr: "Adres",
  },
  {
    label: "Number",
    value: "number",
    labelEn: "Number",
    labelUr: "نمبر",
    labelHi: "नंबर",
    labelAr: "رقم",
    labelDe: "Nummer",
    labelFr: "Numéro",
    labelTr: "Numara",
  },
  {
    label: "Kameez Length",
    value: "kameez_length",
    labelEn: "Kameez Length",
    labelUr: "قمیض کی لمبائی",
    labelHi: "कमीज की लंबाई",
    labelAr: "طول القميص",
    labelDe: "Kameez Länge",
    labelFr: "Longueur Kameez",
    labelTr: "Kamiz Uzunluğu",
  },
  {
    label: "Salwar Length",
    value: "salwar_length",
    labelEn: "Salwar Length",
    labelUr: "شلوار کی لمبائی",
    labelHi: "सलवार की लंबाई",
    labelAr: "طول الشلوار",
    labelDe: "Salwar Länge",
    labelFr: "Longueur Salwar",
    labelTr: "Şalvar Uzunluğu",
  },
  {
    label: "Bazo Length",
    value: "bazo_length",
    labelEn: "Bazo Length",
    labelUr: "بازو",
    labelHi: "बांह की लंबाई",
    labelAr: "طول الذراع",
    labelDe: "Armlänge",
    labelFr: "Longueur bras",
    labelTr: "Kol Uzunluğu",
  },
  {
    label: "Neck Size",
    value: "neck_size",
    labelEn: "Neck Size",
    labelUr: "گردن",
    labelHi: "गर्दन का आकार",
    labelAr: "مقاس الرقبة",
    labelDe: "Halsweite",
    labelFr: "Tour de cou",
    labelTr: "Boyun Ölçüsü",
  },
  {
    label: "Suit Style",
    value: "suit_style",
    labelEn: "Cloth Style",
    labelUr: "سوٹ کا انداز",
    labelHi: "सूट शैली",
    labelAr: "نمط البدلة",
    labelDe: "Anzugstil",
    labelFr: "Style de costume",
    labelTr: "Takım Stili",
  },
  {
    label: "Chest",
    value: "chest",
    labelEn: "Chest",
    labelUr: "چھاتی",
    labelHi: "छाती",
    labelAr: "الصدر",
    labelDe: "Brust",
    labelFr: "Poitrine",
    labelTr: "Göğüs",
  },
  {
    label: "Waist",
    value: "waist",
    labelEn: "Waist",
    labelUr: "کمر",
    labelHi: "कमर",
    labelAr: "الخصر",
    labelDe: "Taille",
    labelFr: "Taille",
    labelTr: "Bel",
  },
  {
    label: "Shoulder",
    value: "shoulder",
    labelEn: "Shoulder",
    labelUr: "کندھا",
    labelHi: "कंधा",
    labelAr: "الكتف",
    labelDe: "Schulter",
    labelFr: "Épaule",
    labelTr: "Omuz",
  },
  {
    label: "Asteen",
    value: "asteen",
    labelEn: "Sleeve",
    labelUr: "آستین",
    labelHi: "आस्तीन",
    labelAr: "كم",
    labelDe: "Ärmel",
    labelFr: "Manche",
    labelTr: "Kol",
  },
  {
    label: "Collar Style",
    value: "collarstyle",
    labelEn: "Collar Style",
    labelUr: "کالر کا انداز",
    labelHi: "कॉलर शैली",
    labelAr: "نمط الياقة",
    labelDe: "Kragenstil",
    labelFr: "Style de col",
    labelTr: "Yaka Stili",
  },
  {
    label: "Gheera",
    value: "bottomwidth",
    labelEn: "Pleat",
    labelUr: "گھیرا",
    labelHi: "गीरा",
    labelAr: "طي",
    labelDe: "Raffung",
    labelFr: "Fronces",
    labelTr: "Toplama",
  },
  {
    label: "Salwar Type",
    value: "salwartype",
    labelEn: "Salwar Type",
    labelUr: "شلوار کی قسم",
    labelHi: "सलवार प्रकार",
    labelAr: "نوع الشلوار",
    labelDe: "Salwar Typ",
    labelFr: "Type Salwar",
    labelTr: "Şalvar Türü",
  },
  {
    label: "Color",
    value: "color",
    labelEn: "Color",
    labelUr: "رنگ",
    labelHi: "रंग",
    labelAr: "لون",
    labelDe: "Farbe",
    labelFr: "Couleur",
    labelTr: "Renk",
  },
  {
    label: "Payment",
    value: "payment",
    labelEn: "Payment",
    labelUr: "ادائیگی",
    labelHi: "भुगतान",
    labelAr: "الدفع",
    labelDe: "Zahlung",
    labelFr: "Paiement",
    labelTr: "Ödeme",
  },
  {
    label: "Cloths Number",
    value: "clothsquantity",
    labelEn: "Cloths Number",
    labelUr: "کپڑوں کی تعداد",
    labelHi: "कपड़ों की संख्या",
    labelAr: "عدد الملابس",
    labelDe: "Anzahl Kleider",
    labelFr: "Nombre vêtements",
    labelTr: "Kıyafet Sayısı",
  },
  {
    label: "Basic Price",
    value: "basicPrice",
    labelEn: "Basic Price",
    labelUr: "بنیادی قیمت",
    labelHi: "मूल कीमत",
    labelAr: "السعر الأساسي",
    labelDe: "Grundpreis",
    labelFr: "Prix de base",
    labelTr: "Temel Fiyat",
  },
  {
    label: "Total Bill",
    value: "totalBill",
    labelEn: "Total Bill",
    labelUr: "کل بل",
    labelHi: "कुल बिल",
    labelAr: "الفاتورة الإجمالية",
    labelDe: "Gesamtrechnung",
    labelFr: "Facture totale",
    labelTr: "Toplam Fatura",
  },
  {
    label: "Delivery",
    value: "delivery",
    labelEn: "Delivery",
    labelUr: "ڈلیوری",
    labelHi: "डिलीवरी",
    labelAr: "التوصيل",
    labelDe: "Lieferung",
    labelFr: "Livraison",
    labelTr: "Teslimat",
  },
  {
    label: "Delivery Date",
    value: "delivery_date",
    labelEn: "Delivery Date",
    labelUr: "ڈلیوری کی تاریخ",
    labelHi: "डिलीवरी तारीख",
    labelAr: "تاريخ التوصيل",
    labelDe: "Lieferdatum",
    labelFr: "Date de livraison",
    labelTr: "Teslimat Tarihi",
  },
  {
    label: "Status",
    value: "status",
    labelEn: "Status",
    labelUr: "حالت",
    labelHi: "स्थिति",
    labelAr: "الحالة",
    labelDe: "Status",
    labelFr: "Statut",
    labelTr: "Durum",
  },
];

// Helper function to get preview label based on language
export const getPreviewLabel = (
  field: (typeof previewFields)[0],
  language: Language
): string => {
  switch (language) {
    case "ur":
      return field.labelUr;
    case "hi":
      return field.labelHi;
    case "ar":
      return field.labelAr;
    case "de":
      return field.labelDe;
    case "fr":
      return field.labelFr;
    case "tr":
      return field.labelTr;
    default:
      return field.labelEn;
  }
};

// Customer Preview component props
export interface CustomerPreviewProps {
  customer: FormData;
  onClose: () => void;
  language?: Language;
}
