import { authFetch } from '../fetch';
import { API_AUTH, API_BASE, API_REGISTER } from '../constants';

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
