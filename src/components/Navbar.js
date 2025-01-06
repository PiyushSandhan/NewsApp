import React from 'react';

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-xxl black" style={{background:"black",height:"60px"}}>
        <div className="container-fluid">
          <a style={{color:"white"}}className="navbar-brand" href="/">Daily-News</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Navigation links can be added here */}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;