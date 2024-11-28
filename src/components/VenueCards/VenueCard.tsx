import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import renderStars from '../utils/renderStars';

type VenueCardProps = {
    venue: {
        id: string;
        name: string;
        description: string;
        media: {
            url: string;
            alt: string;
        }[];
        price: number;
        maxGuests: number;
        rating: number;
        meta: {
            wifi: boolean;
            parking: boolean;
            breakfast: boolean;
            pets: boolean;
        };
        location: {
            address?: string;
            city?: string;
            zip?: string;
            country?: string;
        };
    };
};

const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();

    const imageUrl = !imageError && venue.media.length > 0 ? venue.media[0].url : 'https://fakeimg.pl/800x600?text=No+image+available&font=bebas&font_size=50';

    const handleViewClick = () => {
        navigate(`/venue/${venue.id}`);
    };

    return (
        <div className="g-col-12 g-col-md-6 g-col-lg-6 g-col-xl-4 mb-xl-3 mx-xl-2 venue-card">
            <img
                src={imageUrl}
                alt={venue.media.length > 0 ? venue.media[0].alt : venue.name}
                onError={() => setImageError(true)}
            />
            <div className="venue-details">
                <h3 onClick={handleViewClick}>{venue.name}</h3>
                {renderStars(venue.rating as number)}
                <p className="addr">
                    {venue.location?.address || venue.location?.city || venue.location?.country ? (
                        <>
                            {venue.location?.address && `${venue.location.address}, `}
                            {venue.location?.city && `${venue.location.city}, `}
                            {venue.location?.country && `${venue.location.country}`}
                        </>
                    ) : (
                        ' No location provided'
                    )}
                </p>
                <p>{venue.meta.breakfast ? 'Breakfast included' : 'Breakfast not included'}</p>
                <div className="d-flex justify-content-between flex-lg-row flex-column align-items-start price-view-btn">
                    <div className="price">${venue.price}</div>
                    <button className="btn btn-primary px-5 py-2 mt-2 mt-lg-0 view-button" onClick={handleViewClick}>
                        View
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VenueCard;
