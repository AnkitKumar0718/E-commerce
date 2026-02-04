import React, { useContext } from 'react';
import { ToastContext } from '../contexts/ToastContext';
import { AiOutlineClose } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';

function Toast() {
  const { toasts, removeToast } = useContext(ToastContext);

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white animate-slide-in ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          <BsCheckCircle className="text-lg" />
          <span>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 hover:opacity-75"
          >
            <AiOutlineClose />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Toast;
