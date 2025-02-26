import React,{useState,useEffect} from 'react';

function Logout() {
  localStorage.removeItem('token');
  window.location.href = '/login';
}

function Navbar() {
  const [isTokenPresent, setIsTokenPresent] = useState(false);

  // Effect hook to check for token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsTokenPresent(!!token); // !!token will be true if token is not null or undefined
  }, []);
  return (
    <div>
      <nav className="navbar navbar-expand-xxl black" style={{background:"black", height:"60px"}}>
        <div className="container-fluid">
          <a style={{color:"white", fontSize:"30px",fontFamily:"fantasy"}} className="navbar-brand" href="/">Daily-News</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {isTokenPresent && (
            <button className="btn btn-dark" onClick={Logout} style={{background: "black", color: "white", border: "1px solid white", marginLeft: "65%"}}>Logout</button>
          )}
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16" style={{ marginRight: '30px', color:"white" }}>
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
          </svg>
        </div>
      </nav>
      <style>{`
      .navbar-brand:hover{
      transform: scale(1.05);}
        `}
      
      </style>
    </div>
  );
}

export default Navbar;