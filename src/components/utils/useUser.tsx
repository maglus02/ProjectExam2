import { useState, useEffect } from 'react';
import { authFetch } from '../API/fetch';
import { API_BASE, API_PROFILES } from '../API/constants';
import { load } from '../Storage/load';
import { handleError } from './errorHandler';

interface User {
  name: string;
  email: string;
  bio?: string;
  avatar?: {
    url?: string;
    alt?: string;
  };
  venueManager?: boolean;
}

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const profile = load<{ name: string }>('profile');

    if (profile?.name) {
      const fetchUser = async () => {
        try {
          setLoading(true);
          const response = await authFetch(API_BASE + API_PROFILES + `/${profile.name}`);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`${errorData.statusCode || response.status}: ${errorData.errors?.[0]?.message || response.statusText}`);
          }
          const data = await response.json();
          setUser(data.data);
        } catch (error: any) {
          handleError(error);
          setError('Failed to fetch user data');
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  return { user, setUser, loading, error };
};

export default useUser;
