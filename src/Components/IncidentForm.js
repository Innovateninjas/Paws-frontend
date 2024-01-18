// IncidentForm.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function IncidentForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    animalType: '',
    numberOfAnimals: '',
    description: '',
    condition: '',
    image: '',
    userLocation: { latitude: '', longitude: '' },
    name: '',
    phoneNumber: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    animalType: '',
    numberOfAnimals: '',
    description: '',
    condition: '',
    image: '',
    name: '',
    phoneNumber: '',
    email: '',
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
    if (validateForm()) {
      // Handle form submission logic here, e.g., send data to backend
      console.log('Form submitted:', formData);
      // Show success page or perform any other post-submission actions
      setCurrentPage(4); // Assuming 4 is the index for the success page
    }
  };

  const validatePage = (page) => {
    const pageData = formData;
    const pageErrors = {};

    switch (page) {
      case 1:
        if (!pageData.animalType) {
          pageErrors.animalType = 'Animal type is required.';
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
        if (!pageData.name) {
          pageErrors.name = 'Name is required.';
        }
        if (!pageData.phoneNumber) {
          pageErrors.phoneNumber = 'Phone number is required.';
        } else if (!isValidPhoneNumber(pageData.phoneNumber)) {
          pageErrors.phoneNumber = 'Invalid phone number.';
        }
        if (!pageData.email) {
          pageErrors.email = 'Email is required.';
        } else if (!isValidEmail(pageData.email)) {
          pageErrors.email = 'Invalid email address.';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...pageErrors }));
    return Object.values(pageErrors).every((error) => error === '');
  };

  const validateForm = () => {
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
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
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
                name="animalType"
                value={formData.animalType}
                onChange={handleChange}>
                <option value="">Select Animal Type</option>
                <option value="Cat">Cat</option>
                <option value="Dog">Dog</option>
                <option value="Cattle">Cattle</option>
                <option value="Other">Other</option>
              </select>
              <div className="error">{errors.animalType}</div>
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
              User's Location: Latitude {formData.userLocation.latitude},{' '}
              Longitude {formData.userLocation.longitude}
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
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <div className="error">{errors.name}</div>
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
              <div className="error">{errors.phoneNumber}</div>
            </label>
            <br />
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="error">{errors.email}</div>
            </label>
            <br />
            <button type="button" onClick={handleNextPage}>
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
