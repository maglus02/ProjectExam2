import React from 'react';
import renderStars from '../utils/renderStars';

type VenueHeaderProps = {
  rating: number;
  name: string;
  location: {
    address?: string;
    city?: string;
    country?: string;
  };
};

const VenueHeader: React.FC<VenueHeaderProps> = ({ rating, name, location }) => (
  <div className="d-flex flex-column">
    {renderStars(rating)}
    <h1>{name || 'Information about the venue'}</h1>
    <p>
      {location?.address || location?.city || location?.country ? (
        <>
          {location?.address && `${location.address}, `}
          {location?.city && `${location.city}, `}
          {location?.country && `${location.country}`}
        </>
      ) : (
        'No location provided'
      )}
    </p>
  </div>
);

export default VenueHeader;
