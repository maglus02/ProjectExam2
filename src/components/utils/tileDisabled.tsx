const tileDisabled = (date: Date, bookedDates: Date[]): boolean => {
    return bookedDates.some((bookedDate) => bookedDate.toDateString() === date.toDateString());
};

export default tileDisabled;
