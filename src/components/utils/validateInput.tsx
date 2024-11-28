export const validateInput = (
    name: string,
    email: string,
    password: string,
    setErrors: (errors: { [key: string]: string }) => void
) => {
    const newErrors: { [key: string]: string } = {};

    if (name && !/^[A-Za-z0-9_]+$/.test(name)) {
        newErrors.name = 'Name must not contain punctuation symbols apart from underscore (_).';
    }

    if (!/^.+@stud\.noroff\.no$/.test(email)) {
        newErrors.email = 'Email must be a valid stud.noroff.no address.';
    }

    if (password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
};
