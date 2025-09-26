import React from "react";
import { Input } from "../ui/input";

interface MeasurementProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const MeasurementInput: React.FC<MeasurementProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/[^0-9/-]/g, "");

    // // Remove any duplicate "-" or "/"
    // const parts = input.split(/[-/]/);

    // // Auto format as: 20-1/2
    // if (parts[0] && parts[0].length >= 2 && !input.includes("-")) {
    //   input = `${parts[0]}-${parts[1] || ""}`;
    // }

    if (input.includes("-")) {
      const [whole, fraction] = input.split("-");
      if (fraction && fraction.length >= 1 && !input.includes("/")) {
        input = `${whole}-${fraction}/`;
      }
    }

    // Allow only valid patterns while typing
    const validPattern = /^\d{0,3}(-\d{0,2}(\/\d{0,2})?)?$/;

    if (input === "" || validPattern.test(input)) {
      onChange(input);
    }
  };

  return (
    <Input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder || "e.g. 20-1/2"}
      className="w-full"
    />
  );
};

// components/MeasurementInput.tsx
// 'use client';

// import React, { useState } from 'react';
// import { Input } from "@/components/ui/input";

// interface MeasurementInputProps {
//   value: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
// }

// export const MeasurementInput: React.FC<MeasurementInputProps> = ({
//   value,
//   onChange,
//   placeholder
// }) => {
//   const [inputValue, setInputValue] = useState(value || '');
//   const [isManualMode, setIsManualMode] = useState(false);

//   // // Check if value is greater than 20
//   // const isAbove20 = () => {
//   //   if (!inputValue) return false;
    
//   //   // Extract numeric value from fraction format (e.g., "20-1/2" -> 20.5)
//   //   const numericValue = parseFloat(
//   //     inputValue.replace('-', '.').replace('/', '.')
//   //   );
    
//   //   return numericValue > 20;
//   // };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = e.target.value;
    
//     // Allow only numbers, dash, and slash
//     if (!/^[\d\-/]*$/.test(newValue)) {
//       return;
//     }

//     setInputValue(newValue);
    
//     // If value is above 20, switch to manual mode
//     if (newValue && parseFloat(newValue.replace('-', '.').replace('/', '.')) > 20) {
//       setIsManualMode(true);
//     }
    
//     onChange(newValue);
//   };

//   const handleManualToggle = () => {
//     setIsManualMode(!isManualMode);
//     if (!isManualMode) {
//       setInputValue('');
//       onChange('');
//     }
//   };

//   return (
//     <div className="relative">
//       <Input
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//         placeholder={placeholder || "e.g., 20-1/2"}
//         // disabled={isManualMode && !isAbove20()}
//       />
// {/*       
//       {isAbove20() && (
//         <button
//           type="button"
//           onClick={handleManualToggle}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 
//                    bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded 
//                    hover:bg-blue-200 transition-colors"
//         >
//           {isManualMode ? 'Auto' : 'Manual'}
//         </button>
//       )} */}
      
//       {/* Validation message */}
//       {inputValue && !/^\d+(-\d+\/\d+)?$/.test(inputValue) && (
//         <p className="text-red-500 text-xs mt-1">
//           Invalid format. Use numbers only (e.g., 20 or 20-1/2)
//         </p>
//       )}
//     </div>
//   );
// };