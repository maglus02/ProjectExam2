import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './scss/index.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './components/Context/UserContext';
import { setGlobalErrorHandler } from './components/utils/errorHandler';
import ToastHandler from './components/utils/ToastHandler';

const Root: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  React.useEffect(() => {
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
