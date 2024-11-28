import React from 'react';
import '../../scss/BookingCard.scss';

type BookingCardProps = {
    booking: {
        id: string;
        venue: {
            name: string;
            location: {
                address?: string;
                city?: string;
                country?: string;
            };
            media: { url: string; alt?: string }[];
        };
        dateFrom: string;
        dateTo: string;
        guests: number;
        created: string;
    };
};

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
    const {
        venue,
        dateFrom,
        dateTo,
        guests,
        created,
    } = booking;

    return (
        <div className="booking-card d-flex flex-column flex-lg-row gap-4 p-3 mb-3 align-items-start align-items-lg-center">
            <img
                src={venue.media.length > 0 ? venue.media[0].url : 'https://via.placeholder.com/100'}
                alt={venue.media.length > 0 ? venue.media[0].alt : 'Venue Image'}
                className="booking-image"
            />
            <div className='booking-data d-flex flex-column gap-2 gap-lg-0 flex-lg-row align-items-start align-items-lg-center justify-content-between flex-grow-1'>
                <div className="booking-info d-flex flex-column">
                    <h5 className="venue-name">{venue.name}</h5>
                    <p className="venue-location">
                        {venue.location.address && `${venue.location.address}, `}
                        {venue.location.city && `${venue.location.city}, `}
                        {venue.location.country}
                    </p>
                </div>
                <div className="booking-dates d-flex flex-column">
                    <p className='label'>Date:</p>
                    <p>{new Date(dateFrom).toLocaleDateString()} - {new Date(dateTo).toLocaleDateString()}</p>
                </div>
                <div className="booking-guests d-flex flex-column">
                    <p className='label'>Guests:</p>
                    <p>{guests} Guests</p>
                </div>
                <div className="booking-created d-flex flex-column">
                    <p className='label'>Ordered:</p>
                    <p>{new Date(created).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;
