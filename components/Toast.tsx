'use client';

import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { ToastMessage } from '@/app/types';

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const getStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-500 dark:bg-green-600';
      case 'error':
        return 'bg-red-500 dark:bg-red-600';
      case 'info':
        return 'bg-blue-500 dark:bg-blue-600';
      default:
        return 'bg-gray-500';
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div
      className={`${getStyles()} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md animate-slide-in`}
    >
      {getIcon()}
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="hover:bg-white/20 rounded p-1 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};
