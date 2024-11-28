import { useEffect, useState } from 'react';
import { authFetch } from '../API/fetch';
import { API_BASE, API_VENUES } from '../API/constants';
import { handleError } from '../utils/errorHandler';

/**
 * Custom hook for fetching and managing data for a specific venue.
 * Fetches venue details and calculates all booked dates for the venue.
 * 
 * @param {string | undefined} id - The ID of the venue to fetch data for.
 * @returns {{
*   venue: any | null;
*   bookedDates: Date[];
* }} The venue details and a list of all booked dates.
* 
* @example
* const { venue, bookedDates } = VenueData('12345');
* 
* useEffect(() => {
*   if (venue) {
*     console.log(venue.name); // Access venue details
*   }
*   console.log(bookedDates); // Array of booked dates
* }, [venue, bookedDates]);
*/
const VenueData = (id: string | undefined) => {
  const [venue, setVenue] = useState<any | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);

  useEffect(() => {
    /**
     * Fetches venue details and bookings from the API.
     */
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
