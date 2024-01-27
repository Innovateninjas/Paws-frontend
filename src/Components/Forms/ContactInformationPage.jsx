import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function ContactInformationPage({
  formData,
  errors,
  handleChange,
  handleSubmit,
  validatePage,
  handleNextPage, // Add handleNextPage as a prop
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      // Make an API call to fetch user information based on the CSRF token
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

        // Set user information in the component's state
        handleChange({
          target: { name: "first_name", value: userData.first_name },
        });
        handleChange({
          target: { name: "last_name", value: userData.last_name },
        });
        handleChange({
          target: { name: "username", value: userData.username },
        });
      } else {
        // Handle error when fetching user information
        console.error("Error fetching user information");
      }
    } catch (error) {
      // Handle other errors
      console.error("An error occurred:", error);
    }
  }, [handleChange]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      // Check if the user is logged in by verifying the presence of a CSRF token in localStorage
      const token = localStorage.getItem("csrftoken");
      if (!token) {
        // If not logged in, set isLoggedIn to false
        setIsLoggedIn(false);
      } else {
        // If logged in, set isLoggedIn to true and fetch user information
        setIsLoggedIn(true);
        await fetchUserData();
      }
    };

    checkLoginStatus();
  }, [fetchUserData]);

  return (
    <div>
      <h2>Page 3: Contact Information</h2>
      {isLoggedIn ? (
        <>
          {/* Display read-only fields if the user is logged in */}
          <p>You are logged in. Your information will be pre-filled.</p>
          <p>Name: {formData.first_name}</p>
          <p>Phone Number: {formData.last_name}</p>
          <p>Email: {formData.username}</p>
        </>
      ) : (
        <>
          {/* Allow the user to fill in details manually if not logged in */}
          <label>
            Name:
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <div className="error">{errors.first_name}</div>
          </label>
          <br />
          <label>
            Phone Number:
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
            <div className="error">{errors.last_name}</div>
          </label>
          <br />
          <label>
            Email:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <div className="error">{errors.username}</div>
          </label>
          <br />
        </>
      )}
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
