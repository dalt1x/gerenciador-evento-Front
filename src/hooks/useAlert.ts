import { useState } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertState {
  type: AlertType;
  message: string;
  isVisible: boolean;
}

export const useAlert = () => {
  const [alert, setAlert] = useState<AlertState>({
    type: 'info',
    message: '',
    isVisible: false,
  });
  
  const showAlert = (type: AlertType, message: string) => {
    setAlert({
      type,
      message,
      isVisible: true,
    });
  };
  
  const hideAlert = () => {
    setAlert((prev) => ({
      ...prev,
      isVisible: false,
    }));
  };
  
  const showSuccess = (message: string) => showAlert('success', message);
  const showError = (message: string) => showAlert('error', message);
  const showWarning = (message: string) => showAlert('warning', message);
  const showInfo = (message: string) => showAlert('info', message);
  
  return {
    alert,
    showAlert,
    hideAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};