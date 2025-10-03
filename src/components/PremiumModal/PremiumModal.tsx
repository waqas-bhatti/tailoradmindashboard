// components/PremiumModal.tsx
"use client";
import React from 'react';
import { X } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  featureDescription: string;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({
  isOpen,
  onClose,
  featureName,
  featureDescription
}) => {
  if (!isOpen) return null;

  const contactInfo = {
    whatsapp: "03036518795",
    email: "mwaqas8795@gmail.com"
  };

  const premiumPlans = [
    {
      title: "Complete Package",
      description: "Pura khareedna ka package",
      price: "$200",
      features: ["All premium features", "Lifetime access", "Priority support"]
    },
    {
      title: "Multiple Features",
      description: "Kuch specific features ke liye",
      price: "$150", 
      features: ["Select multiple features", "1 year support", "Regular updates"]
    },
    {
      title: "Single Feature",
      description: "Sirf ek feature ke liye",
      price: "$100",
      features: ["One premium feature", "6 months support", "Basic updates"]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Premium Feature Required
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Feature Info */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {featureName}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {featureDescription}
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {premiumPlans.map((plan, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              >
                <h4 className="font-bold text-gray-900 dark:text-white">
                  {plan.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {plan.description}
                </p>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                  {plan.price}
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Contact for Purchase
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                WhatsApp:
              </span>
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {contactInfo.whatsapp}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Email:
              </span>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {contactInfo.email}
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <a
              href={`https://wa.me/${contactInfo.whatsapp}?text=Hello! I want to purchase premium features for ${featureName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-center hover:bg-green-700 transition-colors"
            >
              Contact on WhatsApp
            </a>
            <a
              href={`mailto:${contactInfo.email}?subject=Premium Feature Purchase - ${featureName}&body=Hello, I am interested in purchasing premium features.`}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors"
            >
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};