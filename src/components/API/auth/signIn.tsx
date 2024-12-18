import { authFetch } from '../fetch';
import { API_AUTH, API_BASE, API_LOGIN } from '../constants';
import { save } from '../../Storage/save';

/**
 * Handles user sign-in by sending credentials to the authentication API.
 * 
 * @async
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @throws {Error} Throws an error if the login fails.
 * @returns {Promise<void>} Resolves when the login is successful and data is saved.
 */
export const signIn = async (email: string, password: string) => {
  const response = await authFetch(API_BASE + API_AUTH + API_LOGIN, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`${errorData.statusCode}. Login failed. Please check your email and password.`);
  }

  const { accessToken, ...profile } = (await response.json()).data;

  save('token', accessToken);
  save('profile', profile);
};