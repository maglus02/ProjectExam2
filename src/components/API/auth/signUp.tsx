import { authFetch } from '../fetch';
import { API_AUTH, API_BASE, API_REGISTER } from '../constants';

/**
 * Handles user registration by sending form data to the registration API.
 * 
 * @async
 * @param {Object} formData - The data required to register a user.
 * @param {string} formData.name - The name of the user.
 * @param {string} formData.email - The email address of the user.
 * @param {string} formData.password - The password chosen by the user.
 * @param {boolean} formData.venueManager - Indicates whether the user wants to register as a venue manager.
 * @throws {Error} Throws an error if the registration fails.
 * @returns {Promise<any>} The response from the API, parsed as JSON, upon successful registration.
 */
export const signUp = async (formData: {
  name: string;
  email: string;
  password: string;
  venueManager: boolean;
}) => {
  const response = await authFetch(API_BASE + API_AUTH + API_REGISTER, {
    method: 'POST',
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`${errorData.statusCode || response.status}: ${errorData.errors?.[0]?.message || response.statusText}`);
  }

  return response.json();
};
