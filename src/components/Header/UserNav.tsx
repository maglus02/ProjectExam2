import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { LuLayoutPanelTop } from "react-icons/lu";
import { useUserContext } from '../Context/UserContext';

const UserNav: React.FC = () => {
  const { user } = useUserContext();

  return (
    <ul className="navbar-nav ms-auto gap-2">
      {user ? (
        <>
          {user.venueManager && (
            <li className="nav-item px-2 venue-manager-panel-btn btn btn-outline-primary d-flex align-items-center">
              <Link to="/venue-manager" className="nav-link d-flex align-items-center gap-2 w-100">
              <LuLayoutPanelTop size={24} />
                Venue Manager Panel
              </Link>
            </li>
          )}
          <li className="nav-item p-0 px-2 user-profile-btn btn btn-primary">
            <Link to="/user" className="nav-link d-flex align-items-center gap-2">
              <FaUserCircle size={24} />
              <div className="d-flex flex-column align-items-start">
                <span>{user.name}</span>
                <small className="d-block">
                  {user.venueManager ? 'Venue Manager' : 'Customer'}
                </small>
              </div>
            </Link>
          </li>
        </>
      ) : (
        <>
          <li
            className="nav-item p-0 px-3 btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#signUpModal"
          >
            <span className="nav-link">Register</span>
          </li>
          <li
            className="nav-item p-0 px-3 btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#signInModal"
          >
            <span className="nav-link">Sign in</span>
          </li>
        </>
      )}
    </ul>
  );
};

export default UserNav;