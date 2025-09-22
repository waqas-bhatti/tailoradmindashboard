import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(15, "Username must not exceed 15 characters")
  .nonempty("Username is required");

// Enhanced measurement validation
export const measurementValidation = z
  .string()
  .refine(
    (value) => {
      if (!value) return true; // Allow empty for optional fields

      // Allow only numbers, dash, and slash
      if (!/^[\d\-/]+$/.test(value)) {
        return false;
      }

      // Validate format: either whole number or fraction format
      return /^\d+$/.test(value) || /^\d+-\d+\/\d+$/.test(value);
    },
    {
      message: "Invalid format. Use numbers only (e.g., 20 or 20-1/2)",
    }
  )
  .refine(
    (value) => {
      if (!value) return true;

      // Convert to numeric value for comparison
      const numericValue = parseFloat(
        value.replace("-", ".").replace("/", ".")
      );

      // If value is above 20, it must be manually entered (no text validation needed)
      return numericValue <= 50; // Set a reasonable upper limit
    },
    {
      message: "Value seems too large. Please verify the measurement.",
    }
  )
  .optional(); // Make optional since we have validation messages
