import { useState } from "react";


const useLocalStorage = (key, defaultState) => {
  const stored = window.localStorage.getItem(key);
  const initialState = stored ? JSON.parse(stored) : defaultState;

  const [value, setValue] = useState(initialState);

  const updateItem = (newValue) => {
    window.localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  }

  return [value, updateItem];
}

export default useLocalStorage;