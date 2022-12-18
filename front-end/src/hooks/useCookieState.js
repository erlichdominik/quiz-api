// TODO:
/**
 * Save current quiz state to local storage
 * Load quiz from local storage
 * Erase current quiz state and clear it from the cookies
 */

import { useEffect, useState } from 'react';

const useCookieState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const cookieValue = window.localStorage.getItem(key);

    return cookieValue !== null ? JSON.parse(cookieValue) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useCookieState;
