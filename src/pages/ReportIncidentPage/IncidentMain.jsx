// IncidentForm.js

import React, { useState, useEffect } from "react";
import isValidPhoneNumber from "../../Components/utils/Functions/phoneNumberValidator";
import isValidEmail from "../../Components/utils/Functions/emailValidator";
import ImageAndLocationPage from "../../Components/incidentPage/imageAndLocationPage/ImageAndLocationPage";
import AnimalDetailsPage from "./animalDetailspage/AnimalDetailsPage";
import ContactInformationPage from "../../Components/incidentPage/contactInformationPage/ContactInformationPage";
import SuccessPage from "../successPage/SuccessPage";

function IncidentForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    animal_type: "",
    description: "",
    condition: "",
    image: null, // Change to null for correct file handling
    latitude: "",
    longitude: "",
    landmark: "", // @rishicds add proper landmark
    status: "Received", // @rishicds add proper status
    numberOfAnimals: "", // New field for the number of animals
  });

  const [errors, setErrors] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    animal_type: "",
    description: "",
    condition: "",
    image: "",
    latitude: "",
    longitude: "",
    landmark: "",
    status: "",
    numberOfAnimals: "", // New field for the number of animals
  });

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`); // Add this line
  
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBBUSExqFtg19K7UZQ4LzGE7MygnoxibRo`
        );
        const data = await response.json();
  
        if (data.results && data.results.length > 0) {
          const address = data.results[0].formatted_address;
  
          setFormData((prevData) => ({
            ...prevData,
            latitude,
            longitude,
            address, // Store the address in the form data
          }));
        } else {
          console.log('No results found');
        }
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };
  useEffect(() => {
    getUserLocation();
  }, []);


  const handleChange = async (e) => {
    const { name, value } = e.target;


    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error when the user starts typing
    }));
  };

  const handleNextPage = () => {
    if (validatePage(currentPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    console.log("Submitting form:", formData);

    try {
      if (validateForm()) {
        // Send the form data with the Cloudinary URL to the backend
        const response = await fetch("https://aniresfr-backend.vercel.app/api/animals/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Success:", data);
          setCurrentPage(4); // Assuming 4 is the index for the success page
        } else {
          console.error("Error:", response.statusText);
        }
      } else {
        console.log("Form is not valid");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const validatePage = (page) => {

    const pageData = formData;
    const pageErrors = {};

    switch (page) {
      case 1:
        if (!pageData.image) {
          pageErrors.image = "Image is required.";
        }
        break;
      case 2:
        if (!pageData.animal_type) {
          pageErrors.animal_type = "Animal type is required.";
        }
        if (!pageData.description) {
          pageErrors.description = "Description is required.";
        }
        if (!pageData.condition) {
          pageErrors.condition = "Condition is required.";
        }
        break;
      case 3:
        if (!pageData.user_name) {
          pageErrors.user_name = "Name is required.";
        }
        if (!pageData.user_phone) {
          pageErrors.user_phone = "Phone number is required.";
        } else if (!isValidPhoneNumber(pageData.user_phone)) {
          pageErrors.user_phone = "Invalid phone number.";
        }
        if (!pageData.user_email) {
          pageErrors.user_email = "Email is required.";
        } else if (!isValidEmail(pageData.user_email)) {
          pageErrors.user_email = "Invalid email address.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...pageErrors }));
    return Object.values(pageErrors).every((error) => error === "");
  };

  const validateForm = () => {
    return Object.keys(formData).every((field) => {
      if (field === "userLocation") {
        return true; // No need to validate userLocation
      }
      return formData[field] !== "";
    });
  };


 
  // Function to upload image to Cloudinary

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <ImageAndLocationPage
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleNextPage={handleNextPage}
          />
        );
      case 2:
        return (
          <AnimalDetailsPage
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleNextPage={handleNextPage}
          />
        );
      case 3:
        return (
          <ContactInformationPage
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            handleChange={handleChange}
            handleNextPage={handleNextPage}
            handleSubmit={handleSubmit}
            validatePage={() => validatePage(currentPage)}
          />
        );
      case 4:
        return <SuccessPage />;
      default:
        return null;
    }
  };

  return <div>{renderPage()}</div>;
}

export default IncidentForm;