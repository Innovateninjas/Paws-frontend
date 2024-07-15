import React from 'react';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1 className="error-title">Oops! Page Not Found</h1>
      <p className="error-message">We're sorry, but the page you're looking for doesn't exist.</p>
      <div className="button-container">
        <button className="redirect-button" onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
