// ImageAndLocationPage.js

import React from "react";

function ImageAndLocationPage({ formData, errors, handleChange, handleNextPage }) {
  return (
    <div>
      <h2>Page 1: Image and Location</h2>
      <label>
        Image:
        <input type="file" accept="image/*" name="image" onChange={handleChange} />
        <div className="error">{errors.image}</div>
      </label>
      <br />
      <p>
        User's Location: Latitude {formData.latitude}, Longitude {formData.longitude}
      </p>
      <p>
        Address: {formData.address}
      </p>
      <br />
      <button type="button" onClick={handleNextPage}>
        Next
      </button>
    </div>
  );
}

export default ImageAndLocationPage;