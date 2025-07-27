import { useState, useEffect } from 'react';

export function useLocalStorage(
  key: string,
  defaultValue: string
): [string, (val: string) => void] {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ?? defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, state);
      console.log(state);
    } catch (error) {
      console.log(error);
    }
  }, [key, state]);

  return [state, setState];
}
