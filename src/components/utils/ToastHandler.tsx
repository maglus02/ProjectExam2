import React, { useEffect, useRef } from 'react';
import Toast from 'bootstrap/js/dist/toast';

interface ToastHandlerProps {
  message: string | null;
  type: 'error' | 'info' | 'success';
  clearMessage: () => void;
}

/**
 * A reusable toast notification component using Bootstrap's Toast.
 * Displays a toast with a message and type, automatically hides after a delay, 
 * and calls a clearMessage function when hidden.
 * 
 * @param {ToastHandlerProps} props - The props for the ToastHandler component.
 * @param {string | null} props.message - The message to display in the toast.
 * @param {'error' | 'info' | 'success'} props.type - The type of toast to display.
 * @param {() => void} props.clearMessage - A function to clear the toast message.
 * @returns {JSX.Element | null} The rendered toast or null if no message is provided.
 */
const ToastHandler: React.FC<ToastHandlerProps> = ({ message, type, clearMessage }) => {
  const toastRef = useRef<HTMLDivElement | null>(null);
  const toastInstanceRef = useRef<Toast | null>(null);

  useEffect(() => {
    if (message && toastRef.current) {

      const toastElement = toastRef.current;

      if (!toastInstanceRef.current) {
        toastInstanceRef.current = new Toast(toastRef.current, { autohide: true, delay: 5000 });
      }

      toastInstanceRef.current.show();

      const onHidden = () => {
        clearMessage();
      };

      toastElement.addEventListener('hidden.bs.toast', onHidden);

      return () => {
        if (toastElement) {
          toastElement.removeEventListener('hidden.bs.toast', onHidden);
        }
      };
    }
  }, [message, clearMessage]);

  if (!message) {
    return null;
  }

  const toastClass = {
    error: 'text-bg-danger',
    info: 'text-bg-info',
    success: 'text-bg-success',
  }[type];

  return (
    <div
      className="toast-container position-fixed bottom-0 start-50 translate-middle-x"
      style={{ zIndex: 1055 }}
    >
      <div
        ref={toastRef}
        className={`toast align-items-center ${toastClass} border-0`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default ToastHandler;
