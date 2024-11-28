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

/**
 * UserProvider component that provides user-related data and actions to the application.
 * Fetches and manages the user state, providing utility functions to refresh or update user data.
 * 
 * @param {UserProviderProps} props - The props for the UserProvider component.
 * @param {ReactNode} props.children - The children components to be wrapped by the provider.
 * @returns {JSX.Element} The UserContext provider with children.
 */
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);

  /**
   * Fetches the user data from the API and updates the state.
   */
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

  /**
   * Refreshes the user data by re-fetching it from the API.
   */
  const refreshUser = async () => {
    setUpdating(true);
    try {
      await fetchUser();
    } finally {
      setUpdating(false);
    }
  };

  /**
   * Updates the user state with new data.
   * 
   * @param {User} updatedUser - The updated user data to set in the state.
   */
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

/**
 * Custom hook to access the UserContext.
 * 
 * @throws {Error} Throws an error if the hook is used outside of a UserProvider.
 * @returns {UserContextProps} The context value containing user data and actions.
 */
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
