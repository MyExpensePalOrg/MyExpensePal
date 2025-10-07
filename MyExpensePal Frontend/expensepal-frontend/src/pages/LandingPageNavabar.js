
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/LandingPageNavbar.css";  

const LandingPageNavbar = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="navbar-container">
      <div className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item"><Link to="/">Home</Link></li>
          <li className="navbar-item"><Link to="/aboutus">About Us</Link></li>
          <li className="navbar-item"><Link to="/features">Features</Link></li>
          <li className="navbar-item"><Link to="/needhelp">Nead Help</Link></li>
          {/* <li className="navbar-item"><Link to="/contactus">Contact Us</Link></li> */}
          {token ? (
            <li className="navbar-item"><Link to="/dashboard">Dashboard</Link></li>
          ) : (
            <div style={{ display: "flex" }}>
              <li className="navbar-item"><Link to="/login">Login</Link></li>
              <li className="navbar-item"><Link to="/signup">SignUp</Link></li>
            </div>
          )}
        </ul>
      </div>
      
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default LandingPageNavbar;

