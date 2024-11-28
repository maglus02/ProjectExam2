/**
 * Validates user input for name, email, and password fields.
 * Updates the error state using the provided `setErrors` function.
 * 
 * @param {string} name - The name input to validate.
 * @param {string} email - The email input to validate.
 * @param {string} password - The password input to validate.
 * @param {(errors: { [key: string]: string }) => void} setErrors - A callback function to set validation error messages.
 * @returns {boolean} Returns `true` if all inputs are valid, otherwise `false`.
 * 
 * @example
 * const [errors, setErrors] = useState({});
 * const isValid = validateInput('John_Doe', 'john.doe@stud.noroff.no', 'password123', setErrors);
 * 
 * if (!isValid) {
 *   console.log(errors); // Outputs validation error messages.
 * }
 */

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
