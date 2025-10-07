import React from "react";
import "../styles/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to <strong>MyExpensePal</strong>, an app designed to simplify expense tracking and budgeting.
      </p>

      <h2>Meet the Creators</h2>
      <div className="creator">
        <h3>Praveen Muddunur</h3>
        <h3>Bhargav Siddineni</h3>
      </div>

      <h2>Guided By</h2>
      <p className="professor-name">Prof. Ausif Mohammad</p>

      <h2>Why We Built This App?</h2>
      <p>
        MyExpensePal was created to help users take control of their finances with a simple and intuitive interface. We wanted to create a personal budgeting tool that’s not just easy to use, but also enjoyable.
      </p>

      <h2>Future Plans</h2>
      <p>
        We are working on adding features like live chat support, detailed analytics, and integration with other financial platforms.
      </p>
    </div>
  );
};

export default AboutUs;
