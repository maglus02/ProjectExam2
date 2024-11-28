/**
 * A global error handler callback function.
 * Initialized as a no-op function but can be overridden using `setGlobalErrorHandler`.
 */
let globalErrorCallback: (message: string) => void = () => { };

/**
 * Sets the global error handler to the provided callback function.
 * This callback will be invoked whenever `handleError` is called.
 * 
 * @param {(message: string) => void} callback - A function to handle global error messages.
 * @example
 * setGlobalErrorHandler((message) => {
 *   console.error('Global Error:', message);
 * });
 */
export const setGlobalErrorHandler = (callback: (message: string) => void) => {
  globalErrorCallback = callback;
};

/**
 * Handles an error by invoking the global error handler with the error message.
 * Supports both `Error` objects and string messages.
 * 
 * @param {Error | string} error - The error to handle, either as an `Error` object or a string message.
 * @example
 * try {
 *   throw new Error("Something went wrong!");
 * } catch (err) {
 *   handleError(err);
 * }
 */
export const handleError = (error: Error | string) => {
  const errorMessage = typeof error === 'string' ? error : error.message;
  globalErrorCallback(errorMessage);
};