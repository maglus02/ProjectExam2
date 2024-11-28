import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../scss/VenuePage.scss';
import VenueHeader from '../components/VenuePage/VenueHeader';
import VenueImage from '../components/VenuePage/VenueImage';
import BookingCard from '../components/VenuePage/BookingForm';
import CalendarComponent from '../components/VenuePage/Calendar';
import VenueInfo from '../components/VenuePage/VenueInfo';
import VenueData from '../components/VenuePage/VenueData';
import tileDisabled from '../components/utils/tileDisabled';
import { formatDate } from '../components/utils/formatDate';
import LoadingElement from '../components/LoadingElement/LoadingElement';
import { authFetch } from '../components/API/fetch';
import { API_BASE, API_BOOKINGS } from '../components/API/constants';
import handleDateFocus from '../components/utils/handleDateFocus';
import ToastHandler from '../components/utils/ToastHandler';
import { useUserContext } from '../components/Context/UserContext';
import { handleError } from '../components/utils/errorHandler';

/**
 * VenuePage component for displaying detailed information about a specific venue.
 * Allows users to view details, check availability, and book the venue.
 * 
 * @returns {JSX.Element} The rendered VenuePage component.
 */
const VenuePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { venue, bookedDates } = VenueData(id);
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'error' | 'info' | 'success'>('info');
  const [calendarError, setCalendarError] = useState<string | null>(null);
  const { user } = useUserContext();

  useEffect(() => {
    document.title = venue ? `${venue.name} | Holidaze` : 'Venue Details | Holidaze';
  }, [venue]);

  if (!venue) {
    return <LoadingElement />;
  }

  /**
   * Validates if the selected date range is available.
   * 
   * @param {[Date | null, Date | null]} dates - The selected date range.
   * @returns {boolean} True if the range is valid, otherwise false.
   */
  const validateSelectedRange = (dates: [Date | null, Date | null]): boolean => {
    const [from, to] = dates;

    if (!from || !to) {
      return false;
    }

    let currentDate = new Date(from);
    while (currentDate <= to) {
      if (bookedDates.some((bookedDate) => bookedDate.toDateString() === currentDate.toDateString())) {
        return false;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return true;
  };

  /**
   * Handles booking submission.
   * 
   * @param {React.FormEvent} event - The form submission event.
   * @param {number} guests - The number of guests for the booking.
   */
  const handleBooking = async (event: React.FormEvent, guests: number) => {
    event.preventDefault();
    setToastMessage(null);

    const [dateFrom, dateTo] = selectedDates;

    if (!dateFrom || !dateTo) {
      setToastType('error');
      setToastMessage('Please select both a start date and an end date before booking.');
      return;
    }

    if (dateFrom > dateTo) {
      setToastType('error');
      setToastMessage('The "Date From" must be before the "Date To".');
      return;
    }

    setLoading(true);
    try {
      const formattedDateFrom = formatDate(dateFrom);
      const formattedDateTo = formatDate(dateTo);

      const response = await authFetch(API_BASE + API_BOOKINGS, {
        method: 'POST',
        body: JSON.stringify({
          dateFrom: formattedDateFrom,
          dateTo: formattedDateTo,
          guests,
          venueId: id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors[0].message || 'Failed to create booking. Please try again.');
      }

      setToastType('success');
      setToastMessage('Booking successful! Your booking has been confirmed.');
      setSelectedDates([null, null]);
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="container-fluid venue-page">
        <VenueHeader rating={venue.rating} name={venue.name} location={venue.location} />
        <div className="d-flex gap-4 flex-column flex-lg-row align-items-stretch venue-left-right">
          <VenueImage media={venue.media} name={venue.name} />
          <div className="d-flex flex-column gap-2 right-side flex-grow-1">
            <BookingCard
              price={venue.price}
              maxGuests={venue.maxGuests}
              selectedDateFrom={selectedDates[0]}
              setSelectedDateFrom={(date) => setSelectedDates([date, selectedDates[1]])}
              selectedDateTo={selectedDates[1]}
              setSelectedDateTo={(date) => setSelectedDates([selectedDates[0], date])}
              handleDateFocus={() => handleDateFocus(setShowAlert)}
              showAlert={showAlert}
              formatDate={formatDate}
              handleBooking={handleBooking}
              loading={loading}
              isAuthenticated={!!user}
            />
            <CalendarComponent
              tileDisabled={({ date }) => tileDisabled(date, bookedDates)}
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
              validateSelectedRange={validateSelectedRange}
              error={calendarError}
              setError={setCalendarError}
            />
          </div>
        </div>
        <VenueInfo description={venue.description} meta={venue.meta} />
      </div>

      <ToastHandler message={toastMessage} type={toastType} clearMessage={() => setToastMessage(null)} />
    </div>
  );
};

export default VenuePage;
