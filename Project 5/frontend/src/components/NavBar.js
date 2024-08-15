import React, { useState } from "react";
import authService from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const currentUser = authService.getCurrentUser();
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(true);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
      <Link className="navbar-brand" to="/">
        IdeaSharing
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={() => setCollapse(!collapse)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`${collapse && "collapse"} navbar-collapse`}
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ml-auto">
          {currentUser ? (
            <>
              <li className="nav-item">
                <Link className="btn btn-link nav-link" to={`/idea/create`}>
                  Create +
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-link nav-link" to={`/profile`}>
                  My Ideas
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link text-center w-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
