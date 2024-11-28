import { NavigateFunction } from 'react-router-dom';

export const handleSignOut = (navigate: NavigateFunction) => {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    navigate('/');
    window.location.reload();
};

