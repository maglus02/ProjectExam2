import React, { useState, useEffect } from 'react';
import VenueCards from '../components/VenueCards/VenueCardsData';
import '../scss/HomePage.scss';
import { HiSearch } from "react-icons/hi";

/**
 * HomePage component for searching and displaying venue cards.
 * 
 * @returns {JSX.Element} The rendered HomePage component.
 */
const HomePage = (): JSX.Element => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [submittedQuery, setSubmittedQuery] = useState<string>('');

    /**
     * Handles the search form submission.
     * 
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
     */
    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmittedQuery(searchQuery);
    };

    /**
     * Updates the search query state as the user types.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
     */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        document.title = 'Holidaze | Find Your Next Getaway';
    }, []);

    return (
        <>
            <div className="hero-section d-flex justify-content-start">
                <div className="container-fluid text-center hero-center d-flex flex-column justify-content-center">
                    <h1 className="hero-title">Find Your Next Getaway</h1>
                    <form className="search-bar w-100" onSubmit={handleSearchSubmit}>
                        <div className="input-group position-relative">
                            <span className="input-group-text">
                                <HiSearch className="search-icon" />
                            </span>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    id="searchInput"
                                    placeholder="Search for venues"
                                    className="form-control"
                                    value={searchQuery}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="searchInput">Search for venues</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="venue-section">
                <div className="container-fluid">
                    <h2>Venues</h2>
                    <VenueCards searchQuery={submittedQuery} />
                </div>
            </div>
        </>
    );
};

export default HomePage;
