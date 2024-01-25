// SuccessPage.js

import React from "react";
import { Link } from "react-router-dom";

function SuccessPage() {
  return (
    <div>
      <h2>Success Page</h2>
      <p>Thank you for submitting the form!</p>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
      <p>View Your Reports</p>
      <Link to="/view-reports">
        <button>View Reports</button>
      </Link>
    </div>
  );
}

export default SuccessPage;
