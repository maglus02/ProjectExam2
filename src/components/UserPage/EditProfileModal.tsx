import React, { useState, useEffect } from 'react';
import { authFetch } from '../API/fetch';
import { API_BASE, API_PROFILES } from '../API/constants';
import ToastHandler from '../utils/ToastHandler';
import { useUserContext } from '../Context/UserContext';
import { handleError } from '../utils/errorHandler';

const EditProfileModal: React.FC = () => {
    const [bio, setBio] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [avatarAlt, setAvatarAlt] = useState('');
    const [venueManager, setVenueManager] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<'error' | 'info' | 'success'>('info');

    const { user, updateUser, refreshUser } = useUserContext();

    useEffect(() => {
        if (user) {
            setBio(user.bio || '');
            setAvatarUrl(user.avatar?.url || '');
            setAvatarAlt(user.avatar?.alt || '');
            setVenueManager(user.venueManager || false);
        }
    }, [user]);

    const handleSaveChanges = async () => {
        setLoading(true);
        try {
            const response = await authFetch(`${API_BASE}${API_PROFILES}/${user?.name}`, {
                method: 'PUT',
                body: JSON.stringify({
                    bio,
                    avatar: { url: avatarUrl, alt: avatarAlt },
                    venueManager,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`${errorData.statusCode || response.status}: ${errorData.errors?.[0]?.message || response.statusText}`);
            }

            const updatedUser = await response.json();
            updateUser(updatedUser.data);
            await refreshUser();

            setToastType('success');
            setToastMessage('Profile updated successfully!');
        } catch (error: any) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="modal fade" id="editProfileModal" tabIndex={-1} aria-labelledby="editProfileModalLabel"
            aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Profile</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <div className="form-group mb-3">
                            <label htmlFor="bio">Bio</label>
                            <textarea
                                id="bio"
                                className="form-control"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                maxLength={160}
                                placeholder="e.g I like exploring the world..."
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="avatarUrl">Avatar URL</label>
                            <input
                                type="url"
                                id="avatarUrl"
                                className="form-control"
                                value={avatarUrl}
                                onChange={(e) => setAvatarUrl(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="avatarAlt">Avatar Alt Text</label>
                            <input
                                type="text"
                                id="avatarAlt"
                                className="form-control"
                                value={avatarAlt}
                                onChange={(e) => setAvatarAlt(e.target.value)}
                                maxLength={120}
                            />
                        </div>

                        <div className="form-check mb-3">
                            <input
                                type="checkbox"
                                id="venueManager"
                                className="form-check-input"
                                checked={venueManager}
                                onChange={(e) => setVenueManager(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="venueManager">
                                Venue Manager
                            </label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" disabled={loading}>
                            Close
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSaveChanges} disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
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

export default EditProfileModal;
