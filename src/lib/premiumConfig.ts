// lib/premiumConfig.ts (updated)
export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
}

export const premiumFeatures = {
  sidebar: {
    userHistory: {
      id: "premium_user_history",
      name: "User History Access",
      description: "Full access to user history with advanced features",
      price: 100,
      isActive: false,
    },
  },
  crudForm: {
    edit: {
      id: "premium_edit",
      name: "Advanced Edit Features",
      description: "Access to advanced editing capabilities in CRUD forms",
      price: 100,
      isActive: false,
    },
    print: {
      id: "premium_print",
      name: "Print Functionality",
      description: "Print data directly from CRUD forms",
      price: 100,
      isActive: false,
    },
  },
  invoice: {
    print: {
      id: "premium_invoice_print",
      name: "Invoice Printing",
      description: "Generate and print professional invoices",
      price: 100,
      isActive: false,
    },
  },
  languages: {
    arabic: {
      id: "premium_arabic",
      name: "Arabic Language",
      description: "Access to Arabic language support",
      price: 5.99,
      isActive: false,
    },
    german: {
      id: "premium_german",
      name: "German Language",
      description: "Access to German language support",
      price: 5.99,
      isActive: false,
    },
    french: {
      id: "premium_french",
      name: "French Language",
      description: "Access to French language support",
      price: 5.99,
      isActive: false,
    },
    turkish: {
      id: "premium_turkish",
      name: "Turkish Language",
      description: "Access to Turkish language support",
      price: 5.99,
      isActive: false,
    },
  },
};

export type UserRole = "free" | "premium" | "admin";

export interface UserSubscription {
  userId: string;
  role: UserRole;
  premiumFeatures: string[]; // array of feature IDs
  subscriptionEndDate?: string;
  isActive: boolean;
}
