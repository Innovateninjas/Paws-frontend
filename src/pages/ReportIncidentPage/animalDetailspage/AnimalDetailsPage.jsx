import React, { useEffect, useState } from "react";
import styles from "./AnimalDetailsPage.module.css";
import { Tooltip } from 'react-tooltip';
function AnimalDetailsPage({ formData, errors, handleChange, handleBackPage, handleNextPage }) {
  const [isDog, setIsDog] = useState(false);
  const [isCat, setIsCat] = useState(false);
  const [isCattle, setIsCattle] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const [key, setKey] = useState(0);
  useEffect(() => {
    setKey(prev=>prev+1);
    if (formData.predictedAnimal === "dog") {
      setIsDog(true);
    }
    else if (formData.predictedAnimal === "cat") {
      setIsCat(true);
    }
    else if (formData.predictedAnimal === "cattle") {
      setIsCattle(true);
    }
    else if (formData.predictedAnimal === "other") {
      setIsOther(true);
    }
  }, [formData])
  
  setTimeout(() => {
    const elements = document.querySelectorAll('.show-tooltip');
    setKey(prev=>prev+1);
    elements.forEach(element => {
      element.classList.remove('show-tooltip');
    });
  }, 3000);



  return (

    // A MASTER CONTAINER
    <div className={styles.masterContainer}>
      <h1> Describe The Issue</h1>
      <Tooltip
        key={key}
        anchorSelect=".show-tooltip"
        isOpen={formData}
      />


      {/* USED RADIO INPUT INSTEAD OF SELECT TAG */}
      <div>

        <label ><p> Animal Type:</p></label>
        <div className={styles.container}>

          <div className={isDog ? 'show-tooltip': ''}
            data-tooltip-html="<b>Predicted<br>To be a dog</b>"
          >
            <input
              type="radio"
              id="dog"
              name="predictedAnimal"
              value="dog"
              checked={formData.predictedAnimal === 'dog'||formData.animal_type==="dog"}
              onChange={handleChange}
              hidden />
            <label htmlFor="dog">
              <img src="./images/dog.jpg" alt="" />
            </label>
          </div>
          <div className={isCat ? 'show-tooltip' : ''}
            data-tooltip-html="<b>Predicted<br>To be a Cat</b>"
          >
            <input type="radio"
              id="cat"
              name="predictedAnimal"
              value="cat"
              checked={formData.predictedAnimal === 'cat'||formData.animal_type==="cat"}
              onChange={handleChange}
              hidden />

            <label htmlFor="cat">
              <img src="./images/cat.jpg" alt="" />
            </label>
          </div>
          <div className={isCattle ? 'show-tooltip' : ''}
            data-tooltip-html="<b>Predicted<br>To be a Cattle</b>">
            <input type="radio"
              id="cattle"
              name="predictedAnimal"
              value="cattle"
              checked={formData.predictedAnimal === 'cattle'||formData.animal_type==="cattle"}
              onChange={handleChange}
              hidden />
            <label htmlFor="cattle">
              <img src="./images/cow.jpg" alt="" />
            </label>
          </div>
          <div className={isOther ? 'show-tooltip' : ''}
            data-tooltip-html="<b>Predicted<br>To be a Other</b>">
            <input 
            type="radio" 
            id="other" 
            name="predictedAnimal" 
            value="other"
             checked={formData.predictedAnimal === 'other'||formData.animal_type==="other"} 
             onChange={handleChange} 
             hidden />
            <label htmlFor="other">
              <img src="./images/more.jpg" alt="" />
            </label>
          </div>
        </div>
        {/* OPTION:otherS */}
        {formData.predictedAnimal === "other" && (
          <label className={styles.specify}>
            Please specify:
            <input type="text" name="otherAnimalType" onChange={handleChange} />
          </label>
        )}
      </div>
      {/* HOW MANY ANIMALS */}
      <div>

        <label>
          <p> How many animals:</p>

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
      </div>

      {/* DESCRIBE WHAT  HAPPENED */}
      <div>

        <label className={styles.description}>
          <p>Describe what Happened:</p>

          <textarea name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Describe here"></textarea>
          {/* Changed "div" tag to "small" tag and className="error" to  className={styles.error} */}
        </label>
        <small className={styles.error}>{errors.description}</small>
      </div>

      {/* DESCRIBE SEVERITY */}
      <div>

        <p>Describe Severity:</p>
        <label className={styles.wrapSeverity}>




          <div className={styles.severity}>
            <input type="radio" id="urgent" name="condition" value="Urgent" checked={formData.condition === 'Urgent'} onChange={handleChange} />
            <label htmlFor="urgent">
              Urgent
            </label>
          </div>
          <div className={styles.severity}>
            <input type="radio" id="Critical" name="condition" value="Critical" checked={formData.condition === 'Critical'} onChange={handleChange} />
            <label htmlFor="Critical">
              Critical
            </label>
          </div>
          <div className={styles.severity}>
            <input type="radio" id="Normal" name="condition" value="Normal" checked={formData.condition === 'Normal'} onChange={handleChange} />
            <label htmlFor="Normal">
              Normal
            </label>
          </div>
          {/* Changed "div" tag to "small" tag and className="error" to  className={styles.error} */}

        </label>
        <small className={styles.error}>{errors.condition}</small>
      </div>


      {/* BUTTONS */}
      <div className={styles.bttnContainer}>
        {/* ADD AN EVENT AHNDLER FOR BACK BUTTON */}
        <button
          type="button"
          className={styles.bttn}
          onClick={handleBackPage}
        >
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
