import React, { useState } from 'react';
import VenueForm from './VenueForm';
import ToastHandler from '../utils/ToastHandler';
import { authFetch } from '../API/fetch';
import { API_BASE, API_VENUES } from '../API/constants';
import { handleError } from '../utils/errorHandler';

interface UpdateVenueModalProps {
    venue: any;
    onUpdateSuccess: (updatedVenue: any) => void;
}

const UpdateVenueModal: React.FC<UpdateVenueModalProps> = ({ venue, onUpdateSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<'error' | 'info' | 'success'>('info');

    const handleUpdate = async (data: any) => {
        setLoading(true);
        try {
            const response = await authFetch(`${API_BASE}${API_VENUES}/${venue.id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`${errorData.statusCode || response.status}: ${errorData.errors?.[0]?.message || response.statusText}`);
            }

            const updatedVenue = await response.json();
            onUpdateSuccess(updatedVenue.data);
            setToastType('success');
            setToastMessage('Venue updated successfully!');
        } catch (error: any) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal fade" id={`updateVenueModal-${venue.id}`} tabIndex={-1} aria-labelledby="updateVenueModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Venue</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <VenueForm initialData={venue} onSubmit={handleUpdate} loading={loading} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary text-light" data-bs-dismiss="modal" disabled={loading}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary text-light" form="venue-form" disabled={loading}>
                            {loading ? 'Updating...' : 'Update'}
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

export default UpdateVenueModal;
