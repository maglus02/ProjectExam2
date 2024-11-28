import React from 'react';
import VenueCard from './VenueCard';

interface VenueListProps {
  venues: any[];
  handleViewBookingsClick: (id: string, name: string, bookings: any) => void;
  handleViewClick: (id: string) => void;
  handleDeleteClick: (id: string, name: string) => void;
  setVenues: React.Dispatch<React.SetStateAction<any[]>>;
}

const VenueList: React.FC<VenueListProps> = ({
  venues,
  handleViewBookingsClick,
  handleViewClick,
  handleDeleteClick,
  setVenues,
}) => {
  if (venues.length === 0) {
    return <p className="text-center text-muted">You have not created any venues yet.</p>;
  }

  return (
    <div className="venue-list">
      {venues.map((venue) => (
        <VenueCard
          key={venue.id}
          venue={venue}
          handleViewBookingsClick={handleViewBookingsClick}
          handleViewClick={handleViewClick}
          handleDeleteClick={handleDeleteClick}
          setVenues={setVenues}
        />
      ))}
    </div>
  );
};

export default VenueList;
