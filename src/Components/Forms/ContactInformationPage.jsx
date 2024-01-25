// ContactInformationPage.js

import React from "react";

function ContactInformationPage({ formData, errors, handleChange, handleNextPage, handleSubmit, validatePage }) {
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
