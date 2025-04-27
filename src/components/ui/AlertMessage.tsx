import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
  className?: string;
}

const AlertMessage: React.FC<AlertProps> = ({
  type,
  message,
  onClose,
  autoClose = false,
  duration = 5000,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    let timer: number;
    
    if (autoClose) {
      timer = window.setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [autoClose, duration, onClose]);
  
  if (!isVisible) return null;
  
  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <XCircle className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
    info: <AlertCircle className="h-5 w-5" />,
  };
  
  const styles = {
    success: 'bg-green-900/20 border-success-500 text-success-500',
    error: 'bg-red-900/20 border-error-500 text-error-500',
    warning: 'bg-yellow-900/20 border-warning-500 text-warning-500',
    info: 'bg-blue-900/20 border-primary-500 text-primary-500',
  };
  
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };
  
  return (
    <div
      className={twMerge(
        'flex items-center p-4 mb-4 border-l-4 rounded-md animate-fade-in',
        styles[type],
        className
      )}
      role="alert"
    >
      <div className="flex items-center">
        <div className="mr-3">{icons[type]}</div>
        <div className="ml-3 text-sm font-medium">{message}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={handleClose}
          className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 hover:bg-dark-300 inline-flex items-center justify-center"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default AlertMessage;