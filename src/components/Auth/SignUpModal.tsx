import React, { useState } from 'react';
import '../../scss/AuthModals.scss';
import InputField from './InputField';
import { validateInput } from '../utils/validateInput';
import { signUp } from '../API/auth/signUp';
import { signIn } from '../API/auth/signIn';
import { handleError } from '../utils/errorHandler';

const SignUpModal: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    setApiError(null);

    if (validateInput(formData.name, formData.email, formData.password, setErrors)) {
      setLoading(true);
      try {
        await signUp({ ...formData, venueManager: isVenueManager });

        await signIn(formData.email, formData.password);

        window.location.reload();
      } catch (error: any) {
        handleError(error);
        setApiError('Registration failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="modal fade"
      id="signUpModal"
      tabIndex={-1}
      aria-labelledby="signUpModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="signUpModalLabel">Register</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {apiError && <div className="alert alert-danger">{apiError}</div>}

            <form onSubmit={handleSignUp}>
              <InputField
                id="signUpName"
                label="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
                placeholder="e.g Alfred"
              />
              <InputField
                id="signUpEmail"
                label="Email address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                placeholder="e.g name@stud.noroff.no"
              />
              <InputField
                id="signUpPassword"
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                placeholder="********"
              />
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isVenueManager"
                  checked={isVenueManager}
                  onChange={(e) => setIsVenueManager(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="isVenueManager">
                  Register as a Venue Manager
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
