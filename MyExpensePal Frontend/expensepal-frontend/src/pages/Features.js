import React from "react";
import "../styles/Features.css";

const Features = () => {
  return (
    <div className="features-container">
      <h2 className="features-title">Why Choose MyExpensePal?</h2>
      <div className="features-list">
        <div className="feature-item">
          <h3>Track Your Expenses</h3>
          <p>Stay on top of your spending with ease. Add, edit, and manage your expenses in seconds. Whether it’s groceries, bills, or entertainment, you can categorize and record your expenses seamlessly.</p>
        </div>
        <div className="feature-item">
          <h3>Analyze Your Spending</h3>
          <p>Gain insights into your financial habits with our intuitive reports and statistics. Visualize your spending patterns with interactive graphs and pie charts, helping you make better financial decisions.</p>
        </div>
        <div className="feature-item">
          <h3>Set Budgets</h3>
          <p>Define your budget for various categories such as Food, Entertainment, and Utilities. Get real-time alerts when you’re close to exceeding your budget and take control of your spending.</p>
        </div>
        <div className="feature-item">
          <h3>Secure and Private</h3>
          <p>Your data is protected with the latest security standards, ensuring your privacy and safety. We use encryption protocols to safeguard your sensitive financial information.</p>
        </div>
        <div className="feature-item">
          <h3>AI-Based Insights</h3>
          <p>Get personalized financial advice and recommendations based on your spending habits. Our AI engine identifies trends in your expenses and suggests ways to optimize your budget.</p>
        </div>
        <div className="feature-item">
          <h3>Expense Categories</h3>
          <p>Automatically categorize your expenses based on predefined categories like Food, Transportation, Utilities, and more. This feature helps you understand where your money goes each month.</p>
        </div>
        <div className="feature-item">
          <h3>Expense History and Search</h3>
          <p>Easily search and view your past expenses by date, category, or amount. Whether you’re looking for a specific purchase or analyzing your history, our search functionality makes it simple to find what you need.</p>
        </div>
        <div className="feature-item">
          <h3>Real-Time Sync</h3>
          <p>Access your expenses across multiple devices. Whether you’re on your phone, tablet, or desktop, your data is automatically synced, ensuring you always have the latest information at your fingertips.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
