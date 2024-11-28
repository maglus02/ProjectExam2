/**
 * Saves an item to `localStorage` as a JSON string.
 * 
 * @template T The type of the value to be saved.
 * @param {string} key - The key under which the item will be stored in `localStorage`.
 * @param {T} value - The value to store, which will be serialized to a JSON string.
 * 
 * @example
 * // Save an object to localStorage
 * save('user', { name: 'Jane', age: 25 });
 * 
 * // Save a string to localStorage
 * save('token', 'abc123');
 */
export function save<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}