import React, { useState } from 'react';
import '../../scss/AuthModals.scss';
import InputField from './InputField';
import { signIn } from '../API/auth/signIn';
import { handleError } from '../utils/errorHandler';

const SignInModal: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signIn(formData.email, formData.password);

      window.location.reload();
    } catch (error: any) {
      handleError(error);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="signInModal"
      tabIndex={-1}
      aria-labelledby="signInModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="signInModalLabel">
              Sign In
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <InputField
                id="signInEmail"
                label="Email address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e.g name@stud.noroff.no"
              />
              <InputField
                id="signInPassword"
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="********"
              />
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
