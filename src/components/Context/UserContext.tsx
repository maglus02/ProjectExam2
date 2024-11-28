import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authFetch } from '../API/fetch';
import { API_BASE, API_PROFILES } from '../API/constants';
import { load } from '../Storage/load';
import { handleError } from '../utils/errorHandler';

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

interface UserContextProps {
  user: User | null;
  loading: boolean;
  updating: boolean;
  refreshUser: () => Promise<void>;
  updateUser: (updatedUser: User) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);

  const fetchUser = async () => {
    const profile = load<{ name: string }>('profile');
    if (!profile?.name) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await authFetch(API_BASE + API_PROFILES + `/${profile.name}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${errorData.statusCode || response.status}: ${errorData.errors?.[0]?.message || response.statusText}`);
      }
      const responseData = await response.json();
      setUser(responseData.data);
    } catch (error: any) {
      handleError(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    setUpdating(true);
    try {
      await fetchUser();
    } finally {
      setUpdating(false);
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, updating, refreshUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
