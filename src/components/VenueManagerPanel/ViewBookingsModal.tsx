import React from 'react';

interface Booking {
    id: string;
    dateFrom: string;
    dateTo: string;
    created: string;
    guests: number;
    customer: {
        name: string;
        email: string;
    };
}

interface ViewBookingsModalProps {
    venueId: string;
    venueName: string;
    bookings: Booking[];
}

const ViewBookingsModal: React.FC<ViewBookingsModalProps> = ({
    venueName,
    bookings,
}) => {
    return (
        <div
            className="modal fade viewBookingsM"
            id={`viewBookingsModal`}
            tabIndex={-1}
            aria-labelledby="viewBookingsModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Bookings for {venueName}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        {bookings.length > 0 ? (
                            <ul className="list-group p-0">
                                {bookings.map((booking) => (
                                    <li
                                        key={booking.id}
                                        className="list-group-item d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-1 p-3 my-2"
                                    >
                                        <div className="flex-grow-1">
                                            <p className='m-0'>
                                                <strong>Booking ID:</strong> {booking.id}
                                            </p>
                                            <p className='m-0'>
                                                <strong>Created:</strong> {new Date(booking.created).toLocaleDateString()}
                                            </p>
                                            <p className='m-0'>
                                                <strong>Guest:</strong> {booking.customer.name}{' '}
                                                <small>({booking.customer.email})</small>
                                            </p>
                                            <p className='m-0'>
                                                <strong>Booking Dates:</strong> {new Date(booking.dateFrom).toLocaleDateString()} to{' '}
                                                {new Date(booking.dateTo).toLocaleDateString()}
                                            </p>
                                            <p className='m-0'>
                                                <strong>Guests:</strong> {booking.guests}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center">No bookings available for this venue.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewBookingsModal;
