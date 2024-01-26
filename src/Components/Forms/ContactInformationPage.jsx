import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ContactInformationPage({ formData, errors, handleChange, handleNextPage, handleSubmit, validatePage }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      // Check if the user is logged in by verifying the presence of a CSRF token in localStorage
      const token = localStorage.getItem('csrftoken');
      console.log("CSRF Token:", token);
      if (!token) {
        // If not logged in, redirect to the login page
        navigate("/register");
      } else {
        // If logged in, fetch user information and set it in the component's state
        await fetchUserData();
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      // Make an API call to fetch user information based on the CSRF token
      const response = await fetch("https://aniresfr-backend.vercel.app/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('csrftoken')}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();

        // Set user information in the component's state
        handleChange({ target: { name: "user_name", value: userData.name } });
        handleChange({ target: { name: "user_phone", value: userData.phone } });
        handleChange({ target: { name: "user_email", value: userData.email } });
      } else {
        // Handle error when fetching user information
        console.error("Error fetching user information");
      }
    } catch (error) {
      // Handle other errors
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <h2>Page 3: Contact Information</h2>
      <label>
        Name:
        <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} />
        <div className="error">{errors.user_name}</div>
      </label>
      <br />
      <label>
        Phone Number:
        <input type="text" name="user_phone" value={formData.user_phone} onChange={handleChange} />
        <div className="error">{errors.user_phone}</div>
      </label>
      <br />
      <label>
        Email:
        <input type="text" name="user_email" value={formData.user_email} onChange={handleChange} />
        <div className="error">{errors.user_email}</div>
      </label>
      <br />
      <button
        type="button"
        onClick={(e) => {
          if (validatePage()) {
            handleNextPage();
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
