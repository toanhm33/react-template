import { useEffect, useState } from "react";

interface debounceProps {
  value: any;
  delay: number;
}

export default function useDebounce({value, delay}: debounceProps) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );

  return debouncedValue;
}
