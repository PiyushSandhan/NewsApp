import React, { useState, useEffect } from 'react';

function Logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  window.location.href = '/login';
}

function Navbar() {
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Effect hook to check for token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsTokenPresent(!!token); // !!token will be true if token is not null or undefined
  }, []);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev); // Toggle dropdown visibility
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-xxl black"
        style={{ background: 'black', height: '60px' }}
      >
        <div className="container-fluid">
          <a
            style={{
              color: 'white',
              fontSize: '30px',
              fontFamily: 'fantasy',
            }}
            className="navbar-brand"
            href="/"
          >
            Daily-News
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {isTokenPresent && (
            <button
              className="btn btn-dark"
              onClick={Logout}
              style={{
                background: 'black',
                color: 'white',
                border: '1px solid white',
                marginLeft: '65%',
              }}
            >
              Logout
            </button>
          )}

          {/* Profile Icon with Dropdown */}
          <div style={{ position: 'relative', marginRight: '30px' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
              style={{ color: 'white', cursor: 'pointer' }}
              onClick={toggleDropdown}
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>

            {/* Dropdown - Visible only if `showDropdown` is true */}
            {showDropdown && isTokenPresent && (
              <div
                style={{
                  position: 'absolute',
                  top: '40px',
                  right: '0',
                  backgroundColor: '#fff',
                  color: '#000',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                  width: '150px',
                  zIndex: 10,
                }}
              >
                <ul style={{ listStyleType: 'none', padding: '10px', margin: 0 }}>
                  <li
                    style={{ cursor: 'pointer', padding: '5px 0' }}
                    onClick={() => window.location.href = '/update-profile'}
                  >
                    Update Profile
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      <style>{`
        .navbar-brand:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}

export default Navbar;
