import React from 'react';
import { TbPointFilled } from 'react-icons/tb';
import UpdateVenueModal from './UpdateVenueModal';

interface VenueCardProps {
  venue: any;
  handleViewBookingsClick: (id: string, name: string, bookings: any) => void;
  handleViewClick: (id: string) => void;
  handleDeleteClick: (id: string, name: string) => void;
  setVenues: React.Dispatch<React.SetStateAction<any[]>>;
}

const VenueCard: React.FC<VenueCardProps> = ({
  venue,
  handleViewBookingsClick,
  handleViewClick,
  handleDeleteClick,
  setVenues,
}) => {
  return (
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
          <UpdateVenueModal
            venue={venue}
            onUpdateSuccess={(updatedVenue) =>
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
  );
};

export default VenueCard;
