const handleDateFocus = (setShowAlert: (value: boolean) => void) => {
    setShowAlert(true);
    setTimeout(() => {
        setShowAlert(false);
    }, 6000);
};

export default handleDateFocus;
