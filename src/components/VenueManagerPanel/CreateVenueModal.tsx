import React, { useState } from 'react';
import VenueForm from './VenueForm';
import ToastHandler from '../utils/ToastHandler';
import { authFetch } from '../API/fetch';
import { API_BASE, API_VENUES } from '../API/constants';
import { handleError } from '../utils/errorHandler';

interface CreateVenueModalProps {
    onCreateSuccess: (newVenue: any) => void;
}

const CreateVenueModal: React.FC<CreateVenueModalProps> = ({ onCreateSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<'error' | 'info' | 'success'>('info');

    const handleCreate = async (data: any) => {
        setLoading(true);
        try {
            const response = await authFetch(API_BASE + API_VENUES, {
                method: 'POST',
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`${errorData.statusCode || response.status}: ${errorData.errors?.[0]?.message || response.statusText}`);
            }

            const createdVenue = await response.json();
            onCreateSuccess(createdVenue.data);
            setToastType('success');
            setToastMessage('Venue created successfully!');
        } catch (error: any) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal fade" id="createVenueModal" tabIndex={-1} aria-labelledby="createVenueModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create Venue</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <VenueForm onSubmit={handleCreate} loading={loading} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary text-light" data-bs-dismiss="modal" disabled={loading}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary text-light" form="venue-form" disabled={loading}>
                            {loading ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </div>

            </div>
            {
                toastMessage && (
                    <ToastHandler
                        message={toastMessage}
                        type={toastType}
                        clearMessage={() => setToastMessage(null)}
                    />
                )
            }
        </div >
    );
};

export default CreateVenueModal;
