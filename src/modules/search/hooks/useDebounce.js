import { useEffect, useRef } from "react";

export const useDebounce = (value, delay = 500, callback) => {
  const timer = useRef(null);
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (!value) return;
    timer.current = setTimeout(() => {
      callback && callback(value);
    }, delay);
    return () => clearTimeout(timer.current);
  }, [value, delay, callback]);
};
