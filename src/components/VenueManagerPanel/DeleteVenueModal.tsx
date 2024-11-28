import React, { useState } from 'react';
import ToastHandler from '../utils/ToastHandler';
import { authFetch } from '../API/fetch';
import { API_BASE, API_VENUES } from '../API/constants';
import { handleError } from '../utils/errorHandler';

interface DeleteVenueModalProps {
  venueId: string;
  venueName: string;
  onDeleteSuccess: () => void;
}

const DeleteVenueModal: React.FC<DeleteVenueModalProps> = ({
  venueId,
  venueName,
  onDeleteSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'error' | 'info' | 'success'>('info');

  const handleDeleteVenue = async () => {
    setLoading(true);

    try {
      const response = await authFetch(`${API_BASE}${API_VENUES}/${venueId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error( `${errorData.statusCode || response.status}: ${errorData.errors?.[0]?.message || response.statusText}`);
      }

      setToastType('success');
      setToastMessage('Venue deleted successfully!');
      onDeleteSuccess();
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="deleteVenueModal"
      tabIndex={-1}
      aria-labelledby="deleteVenueModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete {venueName}?</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this venue? This action cannot be undone.</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary text-light"
              data-bs-dismiss="modal"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger text-light"
              onClick={handleDeleteVenue}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
      {toastMessage && (
        <ToastHandler
          message={toastMessage}
          type={toastType}
          clearMessage={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};

export default DeleteVenueModal;
