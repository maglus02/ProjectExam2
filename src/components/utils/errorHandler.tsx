let globalErrorCallback: (message: string) => void = () => {};

export const setGlobalErrorHandler = (callback: (message: string) => void) => {
  globalErrorCallback = callback;
};

export const handleError = (error: Error | string) => {
  const errorMessage = typeof error === 'string' ? error : error.message;
  globalErrorCallback(errorMessage);
};