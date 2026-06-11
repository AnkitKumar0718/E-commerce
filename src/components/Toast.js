import React, { useContext } from 'react';
import { ToastContext } from '../contexts/ToastContext';
import { AiOutlineClose } from 'react-icons/ai';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

function Toast() {
  const { toasts, removeToast } = useContext(ToastContext);

  return (
    <div className="fixed top-24 right-4 z-[100] flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 shadow-card-hover text-sm font-medium animate-slide-in min-w-[260px] border-l-4 bg-white ${
            toast.type === 'success'
              ? 'border-l-gold text-primary'
              : 'border-l-rose-500 text-primary'
          }`}
        >
          {toast.type === 'success'
            ? <BsCheckCircleFill className="text-gold text-base flex-shrink-0" />
            : <BsXCircleFill className="text-rose-500 text-base flex-shrink-0" />
          }
          <span className="flex-grow">{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="text-muted hover:text-primary transition-colors">
            <AiOutlineClose className="text-xs" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Toast;
