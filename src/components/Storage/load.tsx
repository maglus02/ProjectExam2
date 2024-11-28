/**
 * Retrieves an item from `localStorage` and parses it as JSON.
 * 
 * @template T The expected type of the parsed item.
 * @param {string} key - The key of the item to retrieve from `localStorage`.
 * @returns {T | null} The parsed item if it exists and is valid JSON, otherwise `null`.
 * 
 * @example
 * // Storing an object in localStorage
 * localStorage.setItem('user', JSON.stringify({ name: 'John', age: 30 }));
 * 
 * // Retrieving the object
 * const user = load<{ name: string; age: number }>('user');
 * if (user) {
 *   console.log(user.name); // Output: 'John'
 * }
 */
export function load<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
}
