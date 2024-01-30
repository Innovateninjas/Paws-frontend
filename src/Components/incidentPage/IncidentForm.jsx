// IncidentForm.js

import React, { useState, useEffect } from "react";
import isValidPhoneNumber from "../utils/Functions/phoneNumberValidator";
import isValidEmail from "../utils/Functions/emailValidator";
import ImageAndLocationPage from "../Forms/imageAndLocationPage/ImageAndLocationPage";
import AnimalDetailsPage from "../Forms/animalDetailspage/AnimalDetailsPage";
import ContactInformationPage from "../Forms/contactInformationPage/ContactInformationPage";
import SuccessPage from "../Forms/successPage/SuccessPage";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";

function IncidentForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    animal_type: "",
    description: "",
    condition: "",
    image: null,
    latitude: "",
    longitude: "",
    landmark: "near here",
    status: "not resolved",
    numberOfAnimals: "",
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
    numberOfAnimals: "",
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
  

  const classifyImage = async (imgElement) => {
    console.log('classifyImage called');
    const model = await mobilenet.load();
    const predictions = await model.classify(imgElement);

    const topPrediction = predictions[0].className;
    let classification;

    if (topPrediction.includes('cat')) {
      classification = 'cat';
    } else if (topPrediction.includes('dog')) {
      classification = 'dog';
    } else if (topPrediction.includes('cattle')) {
      classification = 'cattle';
    } else {
      classification = 'other';
    }

    console.log(`Classification: ${classification}`);
    return classification;
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    let classification; // Declare classification here
  
    if (name === "image" && files && files.length > 0) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(files[0]);
      img.onload = async () => {
        console.log('Image loaded');
        classification = await classifyImage(img);
        const cloudinaryUrl = await uploadImageToCloudinary(files[0]);
        setFormData((prevData) => ({
          ...prevData,
          image: cloudinaryUrl,
          animal_type: classification,
        }));
      };
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
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

    try {
      if (validateForm()) {
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
          setCurrentPage(4);
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
        return true;
      }
      return formData[field] !== "";
    });
  };

  const uploadImageToCloudinary = async (imageFile) => {
    const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/dff97ky68/upload";
    const uploadPreset = "mnxkqfco";

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(cloudinaryUploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload image to Cloudinary: ${response.statusText}`);
      }

      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  };

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
