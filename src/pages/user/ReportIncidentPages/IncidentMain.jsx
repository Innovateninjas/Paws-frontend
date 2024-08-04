import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import isValidPhoneNumber from "../../../utils/Functions/phoneNumberValidator";
import isValidEmail from "../../../utils/Functions/emailValidator";
import ImageAndLocationPage from "./ImageAndLocationPage";
import AnimalDetailsPage from "./AnimalDetailsPage/AnimalDetailsPage";
import ContactInformationPage from "./ContactInformationPage";
import SuccessPage from "./SuccessPage";
import { UserContext } from "../../../utils/contexts/UserContext";
function IncidentForm() {
  const { userData, setKey } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [Submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    animal_type: "",
    predictedAnimal: "",
    predictedNumberOfAnimals: "",
    predictedDescription: "",
    otherAnimalType: "",
    description: "",
    condition: "",
    image: null,
    latitude: "",
    longitude: "",
    landmark: "",
    status: "Received",
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
    imgUpLoading: "",
  });

  useEffect(() => {
    async function increment(no_reports,csrftoken) {
      const url = process.env.REACT_APP_BACKEND_URL;
      try {
        const response = await axios.put(
          `${url}/info/user/`,
          {
            no_reports: no_reports + 1,
          },
          {
            headers: {
              'Authorization': `Token ${csrftoken}`,
            },
            withCredentials: true,
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    if (Submitted) {
      const csrftoken = localStorage.getItem('csrftoken');
      if(!csrftoken){
        return;
      }
      increment(userData.no_reports,csrftoken);
    } else {
      return;
    }

  }, [Submitted, userData]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
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
                address,
              }));
            } else {
              console.log("No results found");
            }
          } catch (error) {
            console.error("Error fetching address:", error);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "predictedAnimal") {
      setFormData((prevData) => ({
        ...prevData,
        predictedAnimal: "",
        animal_type: value,
      }));
    }
    else if (name === "otherAnimalType") {
      setFormData((prevData) => ({
        ...prevData,
        otherAnimalType: value,
      }));
    }
    else if (name === "numberOfAnimals") {
      setFormData((prevData) => ({
        ...prevData,
        predictedNumberOfAnimals: "",
        numberOfAnimals: value,
      }));
    }
    else if (name === "description") {
      setFormData((prevData) => ({
        ...prevData,
        predictedDescription: "",
        description: value,
      }));
    }
    else {
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

  const handleBackPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    if (formData.animal_type === "other") {
      formData.animal_type = formData.otherAnimalType;
    }
    delete formData.otherAnimalType;
    delete formData.predictedAnimal;
    delete formData.predictedNumberOfAnimals;
    delete formData.predictedDescription;

    console.log("Submitting form:", formData);

    try {
      if (validateForm()) {
        const url = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(
          `${url}/api/animals/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          setKey(prevKey => prevKey + 1);
          setSubmitted(true);
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
    console.log(pageData)
    const pageErrors = {};
    switch (page) {
      case 1:
        if (!pageData.image) {
          pageErrors.image = "Image is required.";
        }
        if (!pageData.latitude || !pageData.longitude) {
          pageErrors.latitude =
            "Location is required. Please enable location services in your browser.";
        }
        if (!pageData.landmark) {
          pageErrors.landmark = "Landmark is required.";
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
    return Object.keys(formData).every(
      (field) => formData[field] !== "" && field !== "userLocation"
    );
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
            setErrors={setErrors}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <AnimalDetailsPage
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            handleChange={handleChange}
            handleNextPage={handleNextPage}
            handleBackPage={handleBackPage}
          />
        );
      case 3:
        return (
          <ContactInformationPage
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            handleBackPage={handleBackPage}
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
