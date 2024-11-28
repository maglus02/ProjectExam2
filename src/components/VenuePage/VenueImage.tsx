import React from 'react';

type VenueImageProps = {
  media: { url: string; alt: string }[];
  name: string;
};

const VenueImage: React.FC<VenueImageProps> = ({ media, name }) => (
  <img
    src={media.length > 0 ? media[0].url : 'https://via.placeholder.com/600x400'}
    alt={media.length > 0 ? media[0].alt : name}
    className="venue-image"
  />
);

export default VenueImage;
