import { createContext, useState } from "react";


export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null)
  const [visible, setVisible] = useState(null)
  

  function showToast(message, type = 'success') {
    setToast({ message, type });
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => setToast(null), 300)
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ toast, showToast, visible,}}>
      {children}
    </ToastContext.Provider>
  );
}
