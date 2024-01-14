// IncidentForm.js

import React, { useState, useEffect } from 'react';

function IncidentForm() {
  const [formData, setFormData] = useState({
    name: '',
    animalType: '',
    condition: '',
    phoneNumber: '',
    userLocation: { latitude: '', longitude: '' },
    landmark: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send data to backend
    console.log('Form submitted:', formData);
  };

  useEffect(() => {
    // Get the user's current location using the browser's geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prevData) => ({
          ...prevData,
          userLocation: { latitude, longitude },
        }));
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []); // Run this effect only once on component mount

  return (
    <div>
      <h2>Report an Incident</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Type of Animal:
          <div>
            <label>
              <input
                type="radio"
                name="animalType"
                value="Dog"
                checked={formData.animalType === 'Dog'}
                onChange={handleChange}
              />
              Dog
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="animalType"
                value="Cat"
                checked={formData.animalType === 'Cat'}
                onChange={handleChange}
              />
              Cat
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="animalType"
                value="Cattle"
                checked={formData.animalType === 'Cattle'}
                onChange={handleChange}
              />
              Cattle
            </label>
          </div>
        </label>
        <br />
        <label>
          Condition:
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
          >
            <option value="">Select Condition</option>
            <option value="Critical">Critical</option>
            <option value="Urgent">Urgent</option>
            <option value="Normal">Normal</option>
          </select>
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Landmark:
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          User's Location:
          <p>
            Latitude: {formData.userLocation.latitude}, Longitude:{' '}
            {formData.userLocation.longitude}
          </p>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default IncidentForm;
