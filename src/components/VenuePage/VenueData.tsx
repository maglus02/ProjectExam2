import { useEffect, useState } from 'react';
import { authFetch } from '../API/fetch';
import { API_BASE, API_VENUES } from '../API/constants';
import { handleError } from '../utils/errorHandler';

const VenueData = (id: string | undefined) => {
  const [venue, setVenue] = useState<any | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await authFetch(API_BASE + API_VENUES + `/${id}?_bookings=true`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`${errorData.statusCode || response.status}: ${errorData.errors?.[0]?.message || response.statusText}`);
        }

        const json = await response.json();
        const data = json.data;
        setVenue(data);

        if (data.bookings) {
          const dates: Date[] = [];
          data.bookings.forEach((booking: any) => {
            let current = new Date(booking.dateFrom);
            const end = new Date(booking.dateTo);

            while (current <= end) {
              dates.push(new Date(current));
              current.setDate(current.getDate() + 1);
            }
          });
          setBookedDates(dates);
        }
      } catch (error: any) {
        handleError(error)
      }
    };

    if (id) {
      fetchVenue();
    }
  }, [id]);

  return { venue, bookedDates };
};

export default VenueData;
