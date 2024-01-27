import React, { useEffect, useCallback ,useState} from "react";
import axios from "axios";
import checkLoginStatus from "../utils/Functions/isLoggedIn";

function ContactInformationPage({
  formData,
  setFormData,
  errors,
  handleChange,
  handleSubmit,
  validatePage,
  handleNextPage,
}) {
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  // const isLoggedIn = await checkLoginStatus ;
  
  const fetchUserData = useCallback(async () => {
    try {
      const csrftoken = localStorage.getItem("csrftoken");
      const response = await axios.get(
        "https://aniresfr-backend.vercel.app/user",
        {
          headers: {
            Authorization: `Token ${csrftoken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const userData = response.data;
        return userData;
      } else {
        console.error("Error fetching user information");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const isLoggedIn = await checkLoginStatus();
      setIsLoggedIn(isLoggedIn);
      if (isLoggedIn) {
        const userData = await fetchUserData();
        setFormData((prevData) => ({
          ...prevData,
          user_name: userData.first_name,
          user_phone: userData.last_name,
          user_email: userData.username,
        }));
      }
    };

    fetchData();
  }, [isLoggedIn, fetchUserData, setFormData]);

  // Update input values when formData changes
  useEffect(() => {
    // Make sure the user's changes don't override the fetched data
    if (!isLoggedIn) {
      setFormData((prevData) => ({
        ...prevData,
        user_name: formData.user_name,
        user_phone: formData.user_phone,
        user_email: formData.user_email,
      }));
    }
  }, [formData, isLoggedIn, setFormData]);

  return (
    <div>
      <h2>Page 3: Contact Information</h2>
      {isLoggedIn && (
        <h3>rukja vai tera information la raha hu  </h3>
      )}
      {/* Allow the user to fill in details manually if not logged in */}
      <label>
        Name:
        <input
          type="text"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
        />
        <div className="error">{errors.first_name}</div>
      </label>
      <br />
      <label>
        Phone Number:
        <input
          type="tel"
          name="user_phone"
          value={formData.user_phone}
          onChange={handleChange}
        />
        <div className="error">{errors.last_name}</div>
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="user_email"
          value={formData.user_email}
          onChange={handleChange}
        />
        <div className="error">{errors.username}</div>
      </label>
      <br />
      <button
        type="button"
        onClick={(e) => {
          if (validatePage()) {
            handleNextPage(); // Call the handleNextPage function
            handleSubmit(e);
          }
        }}
      >
        Next
      </button>
    </div>
  );
}

export default ContactInformationPage;
