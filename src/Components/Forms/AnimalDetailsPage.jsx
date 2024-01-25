// AnimalDetailsPage.js

import React from "react";

function AnimalDetailsPage({ formData, errors, handleChange, handleNextPage }) {
  return (
    <div>
      <h2>Page 2: Animal Details</h2>
      <label>
        Animal Type:
        <select name="animal_type" value={formData.animal_type} onChange={handleChange}>
          <option value="">Select Animal Type</option>
          <option value="Cat">Cat</option>
          <option value="Dog">Dog</option>
          <option value="Cattle">Cattle</option>
          <option value="Other">Other</option>
        </select>
        <div className="error">{errors.animal_type}</div>
      </label>
      <br />
      {formData.animal_type === "Other" && (
        <label>
          Please specify:
          <input type="text" name="otherAnimalType" onChange={handleChange} />
        </label>
      )}
      <br />
      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        <div className="error">{errors.description}</div>
      </label>
      <br />
      <label>
        Condition:
        <select name="condition" value={formData.condition} onChange={handleChange}>
          <option value="">Select Condition</option>
          <option value="Critical">Critical</option>
          <option value="Urgent">Urgent</option>
          <option value="Normal">Normal</option>
        </select>
        <div className="error">{errors.condition}</div>
      </label>
      <br />
      <button type="button" onClick={handleNextPage}>
        Next
      </button>
    </div>
  );
}

export default AnimalDetailsPage;
