import React, { useState } from 'react';
import ToastHandler from '../utils/ToastHandler';

type BookingCardProps = {
  price: number;
  maxGuests: number;
  selectedDateFrom: Date | null;
  setSelectedDateFrom: (date: Date) => void;
  selectedDateTo: Date | null;
  setSelectedDateTo: (date: Date) => void;
  handleDateFocus: () => void;
  showAlert: boolean;
  formatDate: (date: Date) => string;
  handleBooking: (event: React.FormEvent, guests: number) => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
};

const BookingCard: React.FC<BookingCardProps> = ({
  price,
  maxGuests,
  selectedDateFrom,
  setSelectedDateFrom,
  selectedDateTo,
  setSelectedDateTo,
  handleDateFocus,
  showAlert,
  formatDate,
  handleBooking,
  loading,
  isAuthenticated,
}) => {
  const [guests, setGuests] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'error' | 'info' | 'success'>('info');

  const handleGuestBooking = (e: React.FormEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setToastMessage('You must sign in to book venue.');
      setToastType('error');
      return;
    }

    handleBooking(e, guests);
  };

  return (
    <div className="booking-card">
      <form onSubmit={handleGuestBooking}>
        <div className="d-flex justify-content-between">
          <div>
            <p className="labels">Price:</p>
            <p className="price">${price}</p>
          </div>
          <div className="d-flex gap-3">
            <div className="form-group">
              <label className="labels" htmlFor="guests">
                Guests:
              </label>
              <input
                type="number"
                id="guests"
                className="form-control"
                value={guests}
                min={1}
                max={maxGuests}
                onChange={(e) => setGuests(Number(e.target.value))}
                disabled={!isAuthenticated}
              />
            </div>
          </div>
        </div>
        <div className="d-flex gap-3 mt-3">
          <div className="form-group">
            <label className="labels" htmlFor="dateFrom">
              Date From:
            </label>
            <input
              type="date"
              id="dateFrom"
              className="form-control"
              value={selectedDateFrom ? formatDate(selectedDateFrom) : ''}
              onClick={() => {
                handleDateFocus();
              }}
              readOnly
              disabled={!isAuthenticated}
            />
          </div>
          <div className="form-group">
            <label className="labels" htmlFor="dateTo">
              Date To:
            </label>
            <input
              type="date"
              id="dateTo"
              className="form-control"
              value={selectedDateTo ? formatDate(selectedDateTo) : ''}
              onClick={() => {
                handleDateFocus();
              }}
              readOnly
              disabled={!isAuthenticated}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary book-button mt-4 w-100"
          disabled={loading || !isAuthenticated}
        >
          {isAuthenticated
            ? loading
              ? 'Booking...'
              : 'Book venue'
            : 'Sign in to book venue'}
        </button>
      </form>

      {showAlert && (
        <ToastHandler
          message="Please use the calendar of availabilty to select the dates."
          type="info"
          clearMessage={() => { }}
        />
      )}

      {toastMessage && (
        <ToastHandler
          message={toastMessage}
          type={toastType}
          clearMessage={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};

export default BookingCard;

