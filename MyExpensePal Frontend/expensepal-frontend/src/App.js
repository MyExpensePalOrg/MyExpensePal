import React, { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./pages/Navbar";
import LogoutButton from "./pages/LogoutButton";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import "./App.css";
import AddExpense from "./pages/AddExpense";
import GetExpense from "./pages/GetExpense";
import UpdateExpense from "./pages/UpdateExpense";
import GetUserDetails from "./pages/GetUserDetails";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import SignUp from "./pages/SignUp";
import AboutUs from "./pages/AboutUs";
import Settings from "./pages/Settings";
import Statistics from "./pages/Statistics";
import NeedHelp from "./pages/NeedHelp";
import UpdateUserDetails from "./pages/UpdateUserDetails";
import Features from "./pages/Features";
import LandingPageNavbar from "./pages/LandingPageNavabar";
  

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !token) {
      setToken(storedToken);
    }
  }, [token]); 

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken(null);
  };

  return (
    
    <Router>
       <Routes>
          <Route path="/" element={<LandingPageNavbar />}>
            <Route index element={<Home />} />
            {/* <Route path="settings" element={<Settings />} /> */}
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="features" element={<Features />} />
            <Route path="needhelp" element={<NeedHelp />} />
            <Route path="login" element={token ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

          {/* Authenticaton pages */}
        
          {/* dashboard layout from here only for authenticated users */}
          {token ? (
          <Route path="/*"
          element={
            <div className="sec">
                <div className="sec1">
                  <Navbar />
                </div>
                <div className="sec2">
                  <div className="sec21">
                    <div style={{paddingRight:"12px"}}><Link to="/needhelp" style={{textDecoration: 'none',color:"white"}}>Need Help?</Link></div>
                    <div className="profile">
                      <Link to="/getuserdetails">
                        <img src="/images/myphoto.jpg" alt="User" />
                      </Link>
                      <h3 style={{ padding: "5px" }}>Hi there,</h3>
                    </div>
                    <LogoutButton onLogout={handleLogout} />
                  </div>
                  <div className="sec22">
                    <Routes>
                      <Route path="/dashboard" element={ token ? <Dashboard /> : <Navigate to="/login" />}/>
                      <Route path="/getexpense" element={<GetExpense />} />
                      <Route path="/addexpense" element={<AddExpense />} />
                      <Route path="/updateexpense" element={<UpdateExpense />} />
                      <Route path="/getuserdetails" element ={<GetUserDetails />} />
                      <Route path="/chat" element={<Chat />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/statistics" element={<Statistics />} />
                      <Route path="/updateuserdetails" element={<UpdateUserDetails onLogout={handleLogout} />} />
                      {/* <Route path="*" element={<Navigate to="/" />} /> */}
                    </Routes>
                  </div>
                </div>
              </div>
            }
          />
        ) : (
          // Redirect unauthenticated users to landing page
          <Route path="*" element={<Navigate to="/" />} />
        )}
       </Routes>
       <ToastContainer position="top-center" autoClose={2000} />
      
    </Router>
  );
};

export default App;
