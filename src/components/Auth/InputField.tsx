import React from 'react';

interface InputFieldProps {
    id: string;
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    placeholder: string;
}


/**
 * A reusable input field component with validation support.
 * 
 * @param {InputFieldProps} props - The props for the InputField component.
 * @param {string} props.id - The unique ID for the input field.
 * @param {string} props.label - The label text displayed for the input field.
 * @param {string} props.type - The type of the input (e.g., "text", "email", "password").
 * @param {string} props.name - The name attribute for the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - Event handler for input changes.
 * @param {string} [props.error] - An optional error message to display for the input field.
 * @param {string} props.placeholder - Placeholder text for the input field.
 * @returns {JSX.Element} The rendered input field component.
 * 
 * @example
 * <InputField
 *   id="email"
 *   label="Email Address"
 *   type="email"
 *   name="email"
 *   value={email}
 *   onChange={handleEmailChange}
 *   error={emailError}
 *   placeholder="Enter your email"
 * />
 */
const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    type,
    name,
    value,
    onChange,
    error,
    placeholder,
}) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={`form-control ${error ? 'is-invalid' : ''}`}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default InputField;
