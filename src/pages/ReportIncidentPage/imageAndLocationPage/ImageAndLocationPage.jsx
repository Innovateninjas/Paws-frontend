import React, { useState, useEffect } from "react"; // Include useEffect
import ImageUploader from "../../../Components/ImageUploader/ImageUploader";
import Map from "../../../Components/MapComponent/map";
import { handleImageChange } from "./handleImageChange";
import styles from "./ImageAndLocationPage.module.css";

function ImageAndLocationPage({ formData, handleChange, handleNextPage }) {
  const [image, setImage] = useState(null);
  const [customCenter, setCustomCenter] = useState([22.5726, 88.3639]);
  useEffect(() => {
    // Ensure formData.latitude and formData.longitude are valid numbers
    const latitude = parseFloat(formData.latitude);
    const longitude = parseFloat(formData.longitude);

    // Update customCenter only if both latitude and longitude are valid numbers
    if (!isNaN(latitude) && !isNaN(longitude)) {
      setCustomCenter([latitude, longitude]);
    }
  }, [formData.latitude, formData.longitude]);

  const onChange = (imageList) => {
    handleImageChange(imageList, setImage, handleChange);
  };

  return (
    <div className={styles.container}>
      <h2> Upload Image and Location</h2>
      <ImageUploader
        image={image}
        setImage={setImage}
        onChange={onChange}
      />
      <Map
        zoom={13}
        center={customCenter}
      />
      <label className={styles.description}>
        <p className={styles.detailWrap}>
          Address: {formData.address}
        </p>
        <textarea name="landmark" value={formData.landmark} onChange={handleChange} rows={3} placeholder="Enter a landmark"></textarea>
      </label>
      <br />
      <button type="button" onClick={handleNextPage} className={styles.next}>
        Next
      </button>
    </div>
  );
}

export default ImageAndLocationPage;
