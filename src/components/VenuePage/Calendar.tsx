import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ToastHandler from '../utils/ToastHandler';

type CalendarComponentProps = {
  tileDisabled: ({ date }: { date: Date }) => boolean;
  selectedDates: [Date | null, Date | null];
  setSelectedDates: (dates: [Date | null, Date | null]) => void;
  validateSelectedRange: (dates: [Date | null, Date | null]) => boolean;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  tileDisabled,
  selectedDates,
  setSelectedDates,
  validateSelectedRange,
  error,
  setError,
}) => {
  type CalendarValue = Date | [Date, Date] | null;

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');

  const clearMessage = () => {
    setToastMessage(null);
  };

  const handleSelect = (value: CalendarValue) => {
    if (value === null) {
      setSelectedDates([null, null]);
      setError('No dates selected.');
      setToastMessage('No dates selected.');
      setToastType('error');
    } else if (Array.isArray(value)) {
      const [startDate, endDate] = value;
      if (startDate && endDate && validateSelectedRange([startDate, endDate])) {
        setSelectedDates([startDate, endDate]);
        setError(null);
        setToastMessage('Dates selected successfully.');
        setToastType('success');
      } else {
        setSelectedDates([null, null]);
        setError('Selected date range includes unavailable dates. Please choose another range.');
        setToastMessage('Selected date range includes unavailable dates. Please choose another range.');
        setToastType('error');
      }
    } else if (value instanceof Date) {
      setSelectedDates([value, value]);
      setError(null);
      setToastMessage('Date selected successfully.');
      setToastType('success');
    }
  };

  return (
    <div className="calendar-availability mt-4 p-4 flex-grow-1">
      <h5>Calendar of availability</h5>
      <p>Unavailable dates are greyed out.</p>
      <Calendar
        tileDisabled={tileDisabled}
        selectRange
        value={selectedDates}
        onChange={(value) => handleSelect(value as CalendarValue)}
      />
      {toastMessage && (
        <ToastHandler
          message={toastMessage}
          type={toastType}
          clearMessage={clearMessage}
        />
      )}
    </div>
  );
};

export default CalendarComponent;
