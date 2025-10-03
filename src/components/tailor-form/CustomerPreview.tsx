"use client";
import React from "react";
import type { User } from "@/types/customerTypes";
import { CustomerPreviewProps, previewFields, getPreviewLabel, Language, clothesDetailFields, tailorAdminFields, getOptionLabel } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";

const CustomerPreview: React.FC<CustomerPreviewProps> = ({ 
  customer, 
  onClose 
}) => {
  const { language } = useLanguage();

  // Get title based on language
  const getTitle = (lang: Language): string => {
    const titles = {
      en: "Customer Preview",
      ur: "گاہک کا پیش نظارہ",
      hi: "ग्राहक पूर्वावलोकन",
      ar: "معاينة العميل",
      de: "Kundenvorschau",
      fr: "Aperçu client",
      tr: "Müşteri Önizleme"
    };
    return titles[lang] || titles.en;
  };

  // Get close button text based on language
  const getCloseText = (lang: Language): string => {
    const texts = {
      en: "Close",
      ur: "بند کریں",
      hi: "बंद करें",
      ar: "إغلاق",
      de: "Schließen",
      fr: "Fermer",
      tr: "Kapat"
    };
    return texts[lang] || texts.en;
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  // Format status for display
  const formatStatus = (status: string): string => {
    const statusMap: Record<string, Record<Language, string>> = {
      pending: {
        en: "Pending",
        ur: "زیر التواء",
        hi: "लंबित",
        ar: "معلق",
        de: "Ausstehend",
        fr: "En attente",
        tr: "Beklemede"
      },
      complete: {
        en: "Complete",
        ur: "مکمل",
        hi: "पूर्ण",
        ar: "مكتمل",
        de: "Abgeschlossen",
        fr: "Terminé",
        tr: "Tamamlandı"
      },
      in_progress: {
        en: "In Progress",
        ur: "جاری ہے",
        hi: "प्रगति पर",
        ar: "قيد التنفيذ",
        de: "In Bearbeitung",
        fr: "En cours",
        tr: "Devam Ediyor"
      }
    };

    return statusMap[status]?.[language] || status;
  };

  // ✅ PERFECT SOLUTION: Convert database value with manual "Not use" handling
  const convertToCurrentLanguage = (fieldName: string, dbValue: string): string => {
    if (!dbValue || dbValue === "N/A") return dbValue;

    // Combine all form fields to search
    const allFields = [...clothesDetailFields, ...tailorAdminFields];
    
    // Find the field configuration
    const fieldConfig = allFields.find(field => field.name === fieldName);
    
    if (fieldConfig && fieldConfig.options) {
      // Find the option with matching English value
      const option = fieldConfig.options.find(opt => opt.value === dbValue);
      
      if (option) {
        // Use your existing getOptionLabel function
        const translatedLabel = getOptionLabel(option, language);
        
        // ✅ MANUAL HANDLING: Check specific "Not use" values for each field
        if (fieldName === "suit_style") {
          const notUseValues = ["Sherwani", "Kurta Pajama", "Pathani Suit", "Sindhi Suit", "Balochi Suit"];
          if (notUseValues.includes(dbValue)) {
            // Check if current language shows "Not use"
            const notUseIndicators = {
              en: ["❌", "Not use"],
              ur: ["❌"],
              hi: ["❌", "उपयोग न करें"],
              ar: ["❌", "لا تستخدم"],
              de: ["❌", "Nicht verwenden"],
              fr: ["❌", "Ne pas utiliser"],
              tr: ["❌", "Kullanmayın"]
            };
            
            const currentIndicators = notUseIndicators[language] || notUseIndicators.en;
            const isNotUse = currentIndicators.some(indicator => 
              translatedLabel.includes(indicator)
            );
            
            if (isNotUse) {
              return dbValue; // Return original value like "Sherwani"
            }
          }
        }
        
        if (fieldName === "salwartype") {
          const notUseValues = ["pajama_blochi", "blochi", "sindi"];
          if (notUseValues.includes(dbValue)) {
            // Check if current language shows "Not use"
            const notUseIndicators = {
              en: ["❌", "Not use"],
              ur: ["❌"],
              hi: ["❌", "उपयोग न करें"],
              ar: ["❌", "لا تستخدم"],
              de: ["❌", "Nicht verwenden"],
              fr: ["❌", "Ne pas utiliser"],
              tr: ["❌", "Kullanmayın"]
            };
            
            const currentIndicators = notUseIndicators[language] || notUseIndicators.en;
            const isNotUse = currentIndicators.some(indicator => 
              translatedLabel.includes(indicator)
            );
            
            if (isNotUse) {
              return dbValue; // Return original value like "pajama_blochi"
            }
          }
        }
        
        // For normal values, return translated label
        return translatedLabel;
      }
    }
    
    return dbValue; // Return original if no translation found
  };

  // Get text direction based on language
  const getTextDirection = (lang: Language): "rtl" | "ltr" => {
    return lang === "ar" || lang === "ur" ? "rtl" : "ltr";
  };

  return (
    <div className="p-4" dir={getTextDirection(language)}>
      <div className="rounded-lg border p-6 shadow-lg w-full">
        <h3 className="text-xl font-semibold mb-4 text-center">
          {getTitle(language)}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {previewFields.map((field) => {
            let displayValue = customer[field.value] ?? "N/A";
            
            // Format specific fields
            if (field.value === "delivery_date" && displayValue !== "N/A") {
              displayValue = formatDate(displayValue as string);
            }
            
            if (field.value === "status" && displayValue !== "N/A") {
              displayValue = formatStatus(displayValue as string);
            }

            // ✅ Convert select fields to current language
            const selectFields = [
              "suit_style", "collarstyle", "bottomwidth", "salwartype", 
              "payment", "delivery"
            ];
            
            if (selectFields.includes(field.value) && displayValue !== "N/A") {
              displayValue = convertToCurrentLanguage(field.value, displayValue as string);
            }

            // Format currency fields
            if ((field.value === "basicPrice" || field.value === "totalBill") && displayValue !== "N/A") {
              const numValue = parseFloat(displayValue as string);
              if (!isNaN(numValue)) {
                displayValue = `${numValue.toLocaleString()} PKR`;
              }
            }

            return (
              <div key={field.value} className="break-words">
                <strong>{getPreviewLabel(field, language)}:</strong>{" "}
                <span className="text-black dark:text-green-400">{displayValue}</span>
              </div>
            );
          })}
        </div>
        
        {/* Add the Close button here */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors"
          >
            {getCloseText(language)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerPreview;