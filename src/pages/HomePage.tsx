import React, { useState } from 'react';
import VenueCards from '../components/VenueCards/VenueCardsData';
import '../scss/HomePage.scss';
import { HiSearch } from "react-icons/hi";

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [submittedQuery, setSubmittedQuery] = useState<string>('');

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmittedQuery(searchQuery);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            <div className="hero-section d-flex justify-content-top">
                <div className="container-fluid text-center hero-center">
                    <h1 className="hero-title">Find Your Next Getaway</h1>
                    <form className="search-bar" onSubmit={handleSearchSubmit}>
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
