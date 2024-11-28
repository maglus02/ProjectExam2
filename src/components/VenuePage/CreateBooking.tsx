import React, { useState } from 'react';
import { useUserContext } from '../Context/UserContext'; // Import user context
import { authFetch } from '../API/fetch';
import { API_BASE, API_BOOKINGS } from '../API/constants';
import { formatDate } from '../utils/formatDate';
import CalendarComponent from '../VenuePage/Calendar';
import ToastHandler from '../utils/ToastHandler';
import BookingForm from './BookingForm';

interface CreateBookingProps {
  venueId: string;
  maxGuests: number;
  price: number;
  bookedDates: Date[];
}

const CreateBooking: React.FC<CreateBookingProps> = ({ venueId, maxGuests, price, bookedDates }) => {
  const { user } = useUserContext(); // Access user context
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);
  const [loading, setLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'error' | 'info' | 'success'>('info');

  const validateSelectedRange = (dates: [Date | null, Date | null]): boolean => {
    const [from, to] = dates;

    if (!from || !to) {
      return false;
    }

    let currentDate = new Date(from);
    while (currentDate <= to) {
      if (bookedDates.some((bookedDate) => bookedDate.toDateString() === currentDate.toDateString())) {
        return false; // Found an unavailable date in the selected range
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return true;
  };

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

      const response = await authFetch(`${API_BASE}${API_BOOKINGS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateFrom: formattedDateFrom,
          dateTo: formattedDateTo,
          guests,
          venueId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors[0].message || 'Failed to create booking. Please try again.');
      }

      setToastType('success');
      setToastMessage('Booking successful! Your booking has been confirmed.');
      setSelectedDates([null, null]);
    } catch (err) {
      console.error(err);
      setToastType('error');
      setToastMessage('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-booking mt-0">
      <BookingForm
        price={price}
        maxGuests={maxGuests}
        selectedDateFrom={selectedDates[0]}
        setSelectedDateFrom={(date) => setSelectedDates([date, selectedDates[1]])}
        selectedDateTo={selectedDates[1]}
        setSelectedDateTo={(date) => setSelectedDates([selectedDates[0], date])}
        handleDateFocus={() => setToastMessage('Please use the calendar below to select the dates.')}
        showAlert={toastType === 'info' && toastMessage ? true : false}
        formatDate={formatDate}
        handleBooking={handleBooking}
        loading={loading}
        isAuthenticated={!!user} // Pass the authentication status
      />
      <CalendarComponent
        tileDisabled={({ date }) => bookedDates.some((bookedDate) => bookedDate.toDateString() === date.toDateString())}
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        validateSelectedRange={validateSelectedRange}
        error={null}
        setError={() => {}}
      />
      <ToastHandler message={toastMessage} type={toastType} clearMessage={() => setToastMessage(null)} />
    </div>
  );
};

export default CreateBooking;
