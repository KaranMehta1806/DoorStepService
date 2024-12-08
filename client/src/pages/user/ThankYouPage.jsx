import React from "react";
import { Link } from "react-router-dom";
import "./ThankYouPage.css";

export default function ThankYouPage() {
  return (
    <div className="thankyou-container">
      <div className="thankyou-card">
        <div className="thankyou-icon-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="thankyou-icon"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="9 12 12 15 15 9" />
          </svg>
        </div>
        <h1 className="thankyou-heading">Thank You for Booking!</h1>
        <p className="thankyou-message">
          Your booking was successful! We’re excited to connect you with our
          trusted service partners. Check your orders for more details or return to the homepage.
        </p>
        <div className="thankyou-button-group">
          <Link to="/user/myorder" className="thankyou-orders-button">
            View My Orders
          </Link>
          <Link to="/" className="thankyou-home-button">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
