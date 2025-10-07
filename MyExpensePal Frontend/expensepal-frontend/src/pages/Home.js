
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Expense Tracker</h1>
      <p>Track your spending, manage budgets, and analyze your finances all in one place.</p>
      <Link to="/signup" className="home-button">Get Started</Link>
    </div>
  );
};

export default Home;
