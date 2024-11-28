import React, { useEffect, useState } from 'react';
import '../scss/UserPage.scss';
import BookingCard from '../components/UserPage/BookingCard';
import LoadingElement from '../components/LoadingElement/LoadingElement';
import { handleSignOut } from '../components/utils/signOut';
import { useNavigate } from 'react-router-dom';
import EditProfileModal from '../components/UserPage/EditProfileModal';
import { authFetch } from '../components/API/fetch';
import { API_BASE, API_PROFILES } from '../components/API/constants';
import { useUserContext } from '../components/Context/UserContext';
import { handleError } from '../components/utils/errorHandler';

const UserPage: React.FC = () => {
  const { user } = useUserContext();
  const [bookings, setBookings] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = user ? `${user.name} | Holidaze` : 'User Page | Holidaze';
  }, [user]);

  useEffect(() => {
    const fetchUserBookings = async () => {
      if (user?.name) {
        try {
          const response = await authFetch(API_BASE + API_PROFILES + `/${user.name}?_bookings=true`);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`${errorData.statusCode || response.status}: ${errorData.errors?.[0]?.message || response.statusText}`);
          }
          const data = await response.json();
          setBookings(data.data.bookings);
        } catch (error: any) {
          handleError(error)
        }
      }
    };

    fetchUserBookings();
  }, [user]);

  const handleSignOutClick = () => {
    handleSignOut(navigate);
  };

  if (!user) {
    return <LoadingElement />;
  }

  return (
    <div className="wrapper">
      <div className="user-page container-fluid">
        <div className="profile-section d-flex flex-lg-row flex-column-reverse justify-content-between align-items-center align-items-lg-start gap-3 p-4 mb-4">
          <div className="profile-data d-flex align-items-lg-start align-items-center flex-column gap-4">
            <img src={user.avatar?.url} alt={user.avatar?.alt} className="profile-avatar" />
            <div>
              <h3>{user.name || "User's name"}</h3>
              <p className="email">{user.email}</p>
              <p className="my-0">{user.bio || 'No bio set.'}</p>
            </div>
          </div>
          <div className="profile-buttons d-flex gap-3 align-self-end align-self-lg-start">
            <button className="btn btn-secondary edit-profile-btn text-light" data-bs-toggle="modal" data-bs-target="#editProfileModal">
              Edit Profile
            </button>
            <button className="btn btn-danger sign-out-btn text-light" onClick={handleSignOutClick}>
              Sign Out
            </button>
          </div>
        </div>

        <div className="bookings-section">
          <h4>Bookings:</h4>
          <div className="bookings-list">
            {bookings.length > 0 ? (
              bookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
            ) : (
              <p>No bookings found.</p>
            )}
          </div>
        </div>
      </div>

      <EditProfileModal />
    </div>
  );
};

export default UserPage;
