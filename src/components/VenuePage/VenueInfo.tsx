import React from 'react';
import { FaWifi } from 'react-icons/fa';
import { MdPets, MdFreeBreakfast, MdLocalParking } from 'react-icons/md';

type VenueInfoProps = {
  description: string;
  meta: {
    wifi?: boolean;
    breakfast?: boolean;
    pets?: boolean;
    parking?: boolean;
  };
};

const VenueInfo: React.FC<VenueInfoProps> = ({ description, meta }) => (
  <div className="col-12 venue-info">
    <h2>Venue Information</h2>
    <p>{description || 'Information about the venue'}</p>

    <div className="venue-amenities mt-4">
      <h4>Amenities</h4>
      <div className="d-flex flex-wrap gap-3">
        {meta?.wifi && (
          <div className="amenity-item d-flex align-items-center">
            <FaWifi className="amenity-icon" />
            <span>WiFi</span>
          </div>
        )}
        {meta?.breakfast && (
          <div className="amenity-item d-flex align-items-center">
            <MdFreeBreakfast className="amenity-icon" />
            <span>Breakfast Included</span>
          </div>
        )}
        {meta?.pets && (
          <div className="amenity-item d-flex align-items-center">
            <MdPets className="amenity-icon" />
            <span>Pets Allowed</span>
          </div>
        )}
        {meta?.parking && (
          <div className="amenity-item d-flex align-items-center">
            <MdLocalParking className="amenity-icon" />
            <span>Parking Available</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default VenueInfo;
