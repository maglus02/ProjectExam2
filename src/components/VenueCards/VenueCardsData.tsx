import React, { useEffect, useState } from 'react';
import '../../scss/VenueCards.scss';
import { authFetch } from '../API/fetch';
import { API_BASE, API_VENUES } from '../API/constants';
import VenueCard from './VenueCard';
import LoadingElement from '../LoadingElement/LoadingElement';
import { handleError } from '../utils/errorHandler';

type VenueCardsProps = {
    searchQuery: string;
};

const VenueCards: React.FC<VenueCardsProps> = ({ searchQuery }) => {
    const [venues, setVenues] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(1);

    useEffect(() => {
        const getVenues = async () => {
            try {
                setLoading(true);
                let response;

                if (searchQuery.trim()) {
                    response = await authFetch(API_BASE + API_VENUES + `/search?q=${encodeURIComponent(searchQuery)}&page=${currentPage}`);
                } else {
                    response = await authFetch(API_BASE + API_VENUES +`?page=${currentPage}&sort=created&sortOrder=asc`);
                }

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error( `${errorData.statusCode || response.status}: ${errorData.errors?.[0]?.message || response.statusText}`);
                }

                const responseData = await response.json();

                if (!responseData || !Array.isArray(responseData.data)) {
                    throw new Error('Unexpected response format');
                }

                setVenues(responseData.data);
                setPageCount(responseData.meta.pageCount);
                setLoading(false);
            } catch (error: any) {
                handleError(error);
                setError('Error fetching venues.');
                setLoading(false);
            }
        };

        getVenues();
    }, [currentPage, searchQuery]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) {
        return < LoadingElement/>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <div className="grid venue-list">
                {venues.length > 0 ? (
                    venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)
                ) : (
                    <p>No venues found.</p>
                )}
            </div>

            {venues.length > 0 && (
                <div className="pagination d-flex justify-content-center mt-4">
                    {Array.from({ length: pageCount }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`btn btn-outline-primary mx-1 ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </>
    );
};

export default VenueCards;
