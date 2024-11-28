import React, { useState, useEffect } from 'react';
import '../scss/VenueManagerPage.scss';
import { useNavigate } from 'react-router-dom';
import { authFetch } from '../components/API/fetch';
import { API_BASE, API_PROFILES } from '../components/API/constants';
import { useUserContext } from '../components/Context/UserContext';
import CreateVenueModal from '../components/VenueManagerPanel/CreateVenueModal';
import DeleteVenueModal from '../components/VenueManagerPanel/DeleteVenueModal';
import LoadingElement from '../components/LoadingElement/LoadingElement';
import UpdateVenueModal from '../components/VenueManagerPanel/UpdateVenueModal';
import { FaCirclePlus } from "react-icons/fa6";
import { TbPointFilled } from "react-icons/tb";
import ViewBookingsModal from '../components/VenueManagerPanel/ViewBookingsModal';
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
          throw new Error( `${errorData.statusCode || response.status}: ${errorData.errors?.[0]?.message || response.statusText}`);
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
        {venues.length === 0 ? (
          <p className="text-center text-muted">You have not created any venues yet.</p>
        ) : (
          <div className="venue-list">
            {venues.map((venue) => (
              <div key={venue.id} className="venue-manager-card d-flex flex-lg-row flex-column align-items-stretch">
                <div className="venue-image">
                  <img
                    src={venue.media[0]?.url || '/placeholder.jpg'}
                    alt={venue.media[0]?.alt || 'Venue'}
                  />
                </div>
                <div className="right flex-grow-1 gap-2 d-flex flex-lg-row flex-column align-items-start align-items-lg-center justify-content-between">
                  <div className="venue-details flex-grow-1 ms-0 ms-lg-3">
                    <h2 className="mb-2 mt-3 mt-lg-0 fs-5">{venue.name}</h2>
                    <p className="fs-6"><strong>Location:</strong> {venue.location?.address || 'N/A'}, {venue.location?.city || 'N/A'}, {venue.location?.zip || 'N/A'}, {venue.location?.country || 'N/A'}, {venue.location?.continent || 'N/A'}</p>
                    <p className="fs-6"><strong>Description:</strong> {venue.description || 'No description available'}</p>
                    <p className="fs-6"><strong>Bookings:</strong> {venue.bookings?.length > 0 ? venue.bookings.length : 'No bookings yet'}</p>
                    <p className="fs-6"><strong>Price:</strong> {venue.price}</p>
                    <p className="fs-6"><strong>Rating:</strong> {venue.rating || 'No ratings yet'}</p>
                    <p className="fs-6"><strong>Max Guests:</strong> {venue.maxGuests}</p>
                    <p className="fs-6">
                      <strong>Amenities:</strong>{' '}
                      {[
                        venue.meta?.wifi && 'WiFi',
                        venue.meta?.parking && 'Parking',
                        venue.meta?.breakfast && 'Breakfast',
                        venue.meta?.pets && 'Pets allowed',
                      ]
                        .filter(Boolean)
                        .map((amenity, index, arr) => (
                          <React.Fragment key={index}>
                            {amenity}
                            {index < arr.length - 1 && <TbPointFilled />}
                          </React.Fragment>
                        ))
                        .length > 0 ? (
                        [
                          venue.meta?.wifi && 'WiFi',
                          venue.meta?.parking && 'Parking',
                          venue.meta?.breakfast && 'Breakfast',
                          venue.meta?.pets && 'Pets allowed',
                        ]
                          .filter(Boolean)
                          .map((amenity, index, arr) => (
                            <React.Fragment key={index}>
                              {amenity}
                              {index < arr.length - 1 && <TbPointFilled />}
                            </React.Fragment>
                          ))
                      ) : (
                        'No amenities'
                      )}
                    </p>
                  </div>
                  <div className="venue-actions h-100 d-flex flex-column gap-3 gap-lg-2">
                    <button
                      className="btn btn-primary text-light p-lg-2 p-3"
                      data-bs-toggle="modal"
                      data-bs-target={`#viewBookingsModal`}
                      onClick={() => handleViewBookingsClick(venue.id, venue.name, venue.bookings)}
                      disabled={!venue.bookings?.length}
                    >
                      View Bookings
                    </button>
                    <button className="btn btn-secondary text-light p-lg-2 p-3" onClick={() => handleViewClick(venue.id)}>
                      View Venue Listing
                    </button>
                    <button
                      className="btn btn-secondary text-light p-lg-2 p-3"
                      data-bs-toggle="modal"
                      data-bs-target={`#updateVenueModal-${venue.id}`}
                    >
                      Update Venue
                    </button>
                    <UpdateVenueModal venue={venue} onUpdateSuccess={(updatedVenue) =>
                      setVenues((prev) =>
                        prev.map((v) => (v.id === updatedVenue.id ? updatedVenue : v))
                      )
                    }
                    />
                    <button
                      className="btn btn-danger text-light p-lg-2 p-3"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteVenueModal"
                      onClick={() => handleDeleteClick(venue.id, venue.name)}
                    >
                      Delete Venue
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <CreateVenueModal
        onCreateSuccess={handleCreateSuccess} />
      <DeleteVenueModal
        venueId={selectedVenue?.id || ''}
        venueName={selectedVenue?.name || ''}
        onDeleteSuccess={handleDeleteSuccess}
      />
      <ViewBookingsModal
        venueId={selectedVenue?.id || ''}
        venueName={selectedVenue?.name || ''}
        bookings={selectedVenue?.bookings || []}
      />
    </div >
  );
};

export default VenueManagerPage;
