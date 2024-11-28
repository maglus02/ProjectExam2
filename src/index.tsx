import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './scss/index.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './components/Context/UserContext';
import { setGlobalErrorHandler } from './components/utils/errorHandler';
import ToastHandler from './components/utils/ToastHandler';

/**
 * Root component for the application.
 * Provides global context and error handling via the `UserProvider` and `ToastHandler`.
 * 
 * @returns {JSX.Element} The root component containing the application.
 */
const Root: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  React.useEffect(() => {
    /**
     * Sets the global error handler to display error messages using the `ToastHandler`.
     * 
     * @param {string} message - The error message to display.
     */
    setGlobalErrorHandler((message: string) => {
      setToastMessage(message);
    });
  }, []);

  return (
    <React.StrictMode>
      <UserProvider>
        {toastMessage && (
          <ToastHandler
            message={toastMessage}
            type="error"
            clearMessage={() => setToastMessage(null)}
          />
        )}
        <App />
      </UserProvider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<Root />);

reportWebVitals();
