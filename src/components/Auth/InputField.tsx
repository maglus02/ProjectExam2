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
