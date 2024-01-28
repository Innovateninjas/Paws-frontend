// IncidentForm.js

import React, { useState, useEffect } from "react";
import isValidPhoneNumber from "../utils/Functions/phoneNumberValidator";
import isValidEmail from "../utils/Functions/emailValidator";
import ImageAndLocationPage from "../Forms/imageAndLocationPage/ImageAndLocationPage";
import AnimalDetailsPage from "../Forms/animalDetailspage/AnimalDetailsPage";
import ContactInformationPage from "../Forms/contactInformationPage/ContactInformationPage";
import SuccessPage from "../Forms/successPage/SuccessPage";

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
    landmark: "near here", // @rishicds add proper landmark
    status: "not resolved", // @rishicds add proper status
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

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files.length > 0) {
      // Handle image file separately

      // Upload the image to Cloudinary
      const cloudinaryUrl = await uploadImageToCloudinary(files[0]);

      // Update the formData with the Cloudinary URL
      setFormData((prevData) => ({
        ...prevData,
        image: cloudinaryUrl,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

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
    e.preventDefault();
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

  // Function to upload image to Cloudinary
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
      return result.secure_url; // Assuming Cloudinary API returns an object with a 'secure_url' property
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error; // Propagate the error
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