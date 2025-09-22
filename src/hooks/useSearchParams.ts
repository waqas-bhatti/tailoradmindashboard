"use client";
import { useState, useEffect } from "react";

export default function useSearchParams(delay: number = 500) {
  const [searchText, setSearchText] = useState(""); // input value
  const [delayedSearchText, setDelayedSearchText] = useState(""); // final committed value
  const [isSearching, setIsSearching] = useState(false);
  const [triggerCount, setTriggerCount] = useState(0);

  // Call this when Enter is pressed
  const triggerSearch = () => {
    setTriggerCount((c) => c + 1);
  };

  // Reset search
  const clearSearch = () => {
    setSearchText("");
    setDelayedSearchText("");
  };

  // Apply debounce only when triggerSearch is called
  useEffect(() => {
    if (triggerCount > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setDelayedSearchText(searchText.trim());
        setIsSearching(false);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [triggerCount, searchText, delay]);

  return {
    searchText, // controlled input value
    setSearchText, // update input
    delayedSearchText, // committed value (used in tables)
    triggerSearch, // call on Enter
    clearSearch, // reset input
    isSearching, // loading flag while debounce is running
  };
}
