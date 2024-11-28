import React, { useState, useEffect } from 'react';
import '../scss/VenueManagerPage.scss';
import { useNavigate } from 'react-router-dom';
import { authFetch } from '../components/API/fetch';
import { API_BASE, API_PROFILES } from '../components/API/constants';
import { useUserContext } from '../components/Context/UserContext';
import LoadingElement from '../components/LoadingElement/LoadingElement';
import VenueList from '../components/VenueManagerPanel/VenueList';
import ModalContainer from '../components/VenueManagerPanel/ModalContainer';
import { FaCirclePlus } from 'react-icons/fa6';
import { handleError } from '../components/utils/errorHandler';

const VenueManagerPage: React.FC = () => {
  const { user, loading: userLoading } = useUserContext();
  const [venues, setVenues] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<{
    id: string;
    name: string;
    bookings?: any[];
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Venue Manager Panel | Holidaze';
  }, []);

  useEffect(() => {
    const fetchUserVenues = async () => {
      if (!user?.name) {
        setError('User not logged in.');
        setLoading(false);
        return;
      }

      try {
        const response = await authFetch(`${API_BASE}${API_PROFILES}/${user.name}/venues?_bookings=true`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`${errorData.statusCode || response.status}: ${errorData.errors?.[0]?.message || response.statusText}`);
        }
        const data = await response.json();
        setVenues(data.data);
        setError(null);
      } catch (error: any) {
        handleError(error);
        setError('Unable to load venues.');
      } finally {
        setLoading(false);
      }
    };

    if (!userLoading) {
      fetchUserVenues();
    }
  }, [user, userLoading]);

  const handleDeleteClick = (id: string, name: string) => {
    setSelectedVenue({ id, name });
  };

  const handleDeleteSuccess = () => {
    if (selectedVenue) {
      setVenues((prevVenues) => prevVenues.filter((v) => v.id !== selectedVenue.id));
      setSelectedVenue(null);
    }
  };

  const handleCreateSuccess = (newVenue: any) => {
    setVenues((prevVenues) => [newVenue, ...prevVenues]);
  };

  const handleViewClick = (id: string) => {
    navigate(`/venue/${id}`);
  };

  const handleViewBookingsClick = (id: string, name: string, bookings: any) => {
    setSelectedVenue({ id, name, bookings });
  };

  if (userLoading || loading) return <LoadingElement />;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="wrapper">
      <div className="venue-manager-page container-fluid">
        <div className="d-flex flex-lg-row flex-column justify-content-center justify-content-lg-between align-items-center mb-4">
          <h1 className="m-3 m-lg-0">Venue Manager Panel</h1>
          <button
            className="btn btn-primary create-v-btn mt-3 mt-lg-0 d-flex align-items-center p-2 justify-content-center justify-content-lg-between text-light"
            data-bs-toggle="modal"
            data-bs-target="#createVenueModal"
          >
            <FaCirclePlus /> <span className="ms-2">Create Venue</span>
          </button>
        </div>
        <VenueList
          venues={venues}
          handleViewBookingsClick={handleViewBookingsClick}
          handleViewClick={handleViewClick}
          handleDeleteClick={handleDeleteClick}
          setVenues={setVenues}
        />
      </div>
      <ModalContainer
        selectedVenue={selectedVenue}
        handleCreateSuccess={handleCreateSuccess}
        handleDeleteSuccess={handleDeleteSuccess}
      />
    </div>
  );
};

export default VenueManagerPage;
