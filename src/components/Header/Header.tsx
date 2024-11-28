import React from 'react';
import { Link } from 'react-router-dom';
import '../../scss/Header.scss';
import SignInModal from '../Auth/SignInModal';
import SignUpModal from '../Auth/SignUpModal';
import UserNav from './UserNav';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <>
      <nav className={`navbar navbar-dark navbar-expand-lg fixed-top ${className}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <div className="logo">
              <h2>Holidaze</h2>
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <hr className="d-lg-none mb-3 mt-0" />
            <UserNav />
          </div>
        </div>
      </nav>

      <SignInModal />
      <SignUpModal />
    </>
  );
};

export default Header;
