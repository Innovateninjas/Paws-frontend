// IncidentForm.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function IncidentForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    animal_type: '',
    description: '',
    condition: '',
    image: '',
    latitude: '',
    longitude: '',
    landmark: 'near here', // @rishicds add proper landmark
    status: 'not resolved',// @rishicds add proper status
  });

  const [errors, setErrors] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    animal_type: '',
    description: '',
    condition: '',
    image: '',
    latitude: '',
    longitude: '',
    landmark: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear the error when the user starts typing
    }));
  };

  const handleNextPage = () => {
    if (validatePage(currentPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form:', formData);
    if (validateForm()) {
      fetch('https://aniresfr-backend.vercel.app/api/animals/', {  // Replace with your Django server URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setCurrentPage(4); // Assuming 4 is the index for the success page
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      console.log('Form is not valid');
    }
  };

  const validatePage = (page) => {
    const pageData = formData;
    const pageErrors = {};
  
    switch (page) {
      case 1:
        if (!pageData.animal_type) {
          pageErrors.animal_type = 'Animal type is required.';
        }
        if (!pageData.description) {
          pageErrors.description = 'Description is required.';
        }
        if (!pageData.condition) {
          pageErrors.condition = 'Condition is required.';
        }
        break;
      case 2:
        if (!pageData.image) {
          pageErrors.image = 'Image is required.';
        }
        break;
      case 3:
        if (!pageData.user_name) {
          pageErrors.user_name = 'Name is required.';
        }
        if (!pageData.user_phone) {
          pageErrors.user_phone = 'Phone number is required.';
        } else if (!isValidPhoneNumber(pageData.user_phone)) {
          pageErrors.user_phone = 'Invalid phone number.';
        }
        if (!pageData.user_email) {
          pageErrors.user_email = 'Email is required.';
        } else if (!isValidEmail(pageData.user_email)) {
          pageErrors.user_email = 'Invalid email address.';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...pageErrors }));
    return Object.values(pageErrors).every((error) => error === '');
  };

  const validateForm = () => {
    return true; // @rishicds fix this
    return Object.keys(formData).every((field) => {
      if (field === 'userLocation') {
        return true; // No need to validate userLocation
      }
      return formData[field] !== '';
    });
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Basic phone number validation (customize as needed)
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const isValidEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData((prevData) => ({
          ...prevData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <div>
            <h2>Page 1: Animal Details</h2>
            <label>
              Animal Type:
              <select
                name="animal_type"
                value={formData.animal_type}
                onChange={handleChange}>
                <option value="">Select Animal Type</option>
                <option value="Cat">Cat</option>
                <option value="Dog">Dog</option>
                <option value="Cattle">Cattle</option>
                <option value="Other">Other</option>
              </select>
              <div className="error">{errors.animal_type}</div>
            </label>
            <br />
            {formData.animalType === 'Other' && (
              <label>
                Please specify:
                <input
                  type="text"
                  name="otherAnimalType"
                  onChange={handleChange}
                />
              </label>
            )}
            <br />
            <label>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              <div className="error">{errors.description}</div>
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
              <div className="error">{errors.condition}</div>
            </label>
            <br />
            <button type="button" onClick={handleNextPage}>
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Page 2: Image and Location</h2>
            <label>
              Image:
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleChange}
              />
              <div className="error">{errors.image}</div>
            </label>
            <br />
            <p>
              User's Location: Latitude {formData.latitude},{' '}
              Longitude {formData.longitude}
            </p>
            <br />
            <button type="button" onClick={handleNextPage}>
              Next
            </button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Page 3: Contact Information</h2>
            <label>
              Name:
              <input
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
              />
              <div className="error">{errors.user_name}</div>
            </label>
            <br />
            <label>
              Phone Number:
              <input
                type="text"
                name="user_phone"
                value={formData.user_phone}
                onChange={handleChange}
              />
              <div className="error">{errors.user_phone}</div>
            </label>
            <br />
            <label>
              Email:
              <input
                type="text"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
              />
              <div className="error">{errors.user_email}</div>
            </label>
            <br />
            <button type="button" onClick={(e) => { handleSubmit(e); handleNextPage(); }}>
              Next
            </button>
          </div>
        );
      case 4:
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
      default:
        return null;
    }
  };

  return <div>{renderPage()}</div>;
}

export default IncidentForm;
