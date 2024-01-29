// AnimalDetailsPage.js

import React from "react";
import styles from "./AnimalDetailsPage.module.css";;
function AnimalDetailsPage({ formData, errors, handleChange, handleNextPage }) {
  return (
    // A MASTER CONTAINER
    <div className={styles.masterContainer}>
      <h1> <u>Describe The Issue</u></h1>
      
      {/* <label>
        Animal Type:
        <select name="animal_type" value={formData.animal_type} onChange={handleChange}>
          <option value="">Select Animal Type</option>
          <option value="Cat">Cat</option>
          <option value="Dog">Dog</option>
          <option value="Cattle">Cattle</option>
          <option value="Other">Other</option>
        </select>
        <div className="error">{errors.animal_type}</div>
      </label> */}


{/* USED RADIO INPUT INSTEAD OF SELECT TAG */}
    <label><p> <b>Animal Type:</b></p></label>
      <div className={styles.container}>
      
        <div>
          <input type="radio" id="dog" name="animal_type" value="Dog" checked={formData.animal_type === 'Dog'} onChange={handleChange} hidden />
          <label for="dog">
            <img src="./images/dog.avif" alt="" />
          </label>
        </div>
        <div>
          <input type="radio" id="cat" name="animal_type" value="Cat" checked={formData.animal_type === 'Cat'} onChange={handleChange} hidden />
          <label for="cat">
            <img src="./images/cat.jpg" alt="" />
          </label>
        </div>
        <div>
          <input type="radio" id="cattle" name="animal_type" value="Cattle" checked={formData.animal_type === 'Cattle'} onChange={handleChange} hidden />
          <label for="cattle">
            <img src="./images/cow.jpg" alt="" />
          </label>
        </div>
        <div>
          <input type="radio" id="other" name="animal_type" value="Other" checked={formData.animal_type === 'Other'} onChange={handleChange} hidden />
          <label for="other">
            <img src="./images/more.jpg" alt="" />
          </label>
        </div>
      </div>
      {/* OPTION:OTHERS */}
      {formData.animal_type === "Other" && (
        <label className={styles.specify}>
          Please specify:
          <input type="text" name="otherAnimalType" onChange={handleChange} />
        </label>
      )}
      {/* HOW MANY ANIMALS */}
      <label>
    <p> <b>How many animals:</b></p>
        
        <div className={styles.container}>
          <label className={styles.radioOption}> One
            <input
              type="radio"
              name="numberOfAnimals"
              value="One"
              checked={formData.numberOfAnimals === "One"}
              onChange={handleChange}
            />

          </label>
          <label className={styles.radioOption}> Two
            <input
              type="radio"
              name="numberOfAnimals"
              value="Two"
              checked={formData.numberOfAnimals === "Two"}
              onChange={handleChange}
            />

          </label>
          <label className={styles.radioOption}>
            More
            <input
              className={styles.radioInput}
              type="radio"
              name="numberOfAnimals"
              value="More"
              checked={formData.numberOfAnimals === "More"}
              onChange={handleChange}
            />

          </label>
        </div>
      </label>

      {/* DESCRIBE WHAT  HAPPENED */}
      <label className={styles.description}>
        <p><b>Describe what Happened:</b></p>

        <textarea name="description" value={formData.description} onChange={handleChange} rows={5}></textarea>
        {/* Changed "div" tag to "small" tag and className="error" to  className={styles.error} */}
        <small className={styles.error}>{errors.description}</small>
      </label>

      {/* DESCRIBE SEVERITY */}
      <label>
      <p><b>Describe Severity:</b></p>
        

        {/* <select name="condition" value={formData.condition} onChange={handleChange}>
          <option value="">Select Condition</option>
          <option value="Critical">Critical</option>
          <option value="Urgent">Urgent</option>
          <option value="Normal">Normal</option>
        </select> */}

        <div className={styles.severity}>
          <input type="radio" id="urgent" name="condition" value="Urgent" checked={formData.condition === 'Urgent'} onChange={handleChange} />
          <label for="urgent">
            Urgent
          </label>
        </div>
        <div className={styles.severity}>
          <input type="radio" id="Critical" name="condition" value="Critical" checked={formData.condition === 'Critical'} onChange={handleChange} />
          <label for="Critical">
            Critical
          </label>
        </div>
        <div className={styles.severity}>
          <input type="radio" id="Normal" name="condition" value="Normal" checked={formData.condition === 'Normal'} onChange={handleChange} />
          <label for="Normal">
            Normal
          </label>
        </div>
        {/* Changed "div" tag to "small" tag and className="error" to  className={styles.error} */}
        <small className={styles.error}>{errors.condition}</small>
      </label>


      {/* BUTTONS */}
      <div className={styles.bttnContainer}>
        {/* ADD AN EVENT AHNDLER FOR BACK BUTTON */}
        <button type="button" className={styles.bttn} >
          Back
        </button>
        <button type="button" className={styles.bttn} onClick={handleNextPage}>
          Next
        </button>
      </div>


    </div>
  );
}

export default AnimalDetailsPage;
