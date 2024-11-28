/**
 * Formats a JavaScript `Date` object into a string in the format `YYYY-MM-DD`.
 * 
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date as a string in the format `YYYY-MM-DD`.
 * 
 * @example
 * const date = new Date(2024, 10, 28); // November 28, 2024
 * const formattedDate = formatDate(date);
 * console.log(formattedDate); // Outputs: "2024-11-28"
 */

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
