import React, { useState, useEffect } from "react"; // Include useEffect
import ImageUploading from 'react-images-uploading';
import { MdDelete } from 'react-icons/md';
import { Camera } from 'react-bootstrap-icons';
import styles from "./ImageAndLocationPage.module.css";
import MyComponent from "../../MapComponent/map";

function ImageAndLocationPage({ formData, handleChange, handleNextPage }) {
  const [image, setImage] = useState(null);
  const [customCenter, setCustomCenter] = useState({ lat: 0, lng: 0 });

  const mobileMapStyle = {
    width: '100%',
    height: '16vh',
    borderRadius: '10px',
    border: "3px solid #0a6d06",
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
  };

  useEffect(() => {
    // Ensure formData.latitude and formData.longitude are valid numbers
    const latitude = parseFloat(formData.latitude);
    const longitude = parseFloat(formData.longitude);

    // Update customCenter only if both latitude and longitude are valid numbers
    if (!isNaN(latitude) && !isNaN(longitude)) {
      setCustomCenter({ lat: latitude, lng: longitude });
    }
  }, [formData.latitude, formData.longitude]);

  const onChange = async (imageList) => {
    if (imageList.length > 0) {
      try {
        const imageUrl = await uploadImageToCloudinary(imageList[0].file);
        setImage(imageUrl);
        handleChange({
          target: {
            name: "image",
            value: imageUrl
          }
        });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

    // Function to upload image to Cloudinary
  const uploadImageToCloudinary = async (imageFile) => {
      const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/dff97ky68/upload";
      const uploadPreset = "mnxkqfco";
  
      const Data = new FormData();
      Data.append("file", imageFile);
      Data.append("upload_preset", uploadPreset);
  
      try {
        const response = await fetch(cloudinaryUploadUrl, {
          method: "POST",
          body: Data,
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

  return (
    <div className={styles.container}>
      <h2> Upload Image and Location</h2>
      <ImageUploading
        value={[image]} // Pass the selected image as an array
        onChange={onChange}
        dataURLKey="data_url"
      >
        {({ onImageUpload, isDragging, dragProps }) => (
          <div className={styles.wrapper}>
            {image && (
              <div className={styles.imageItem}>
                <img src={image} alt="" className={styles.imagePreview} />
              </div>
            )}
            <div className={styles.buttons}>
              {image ? (
                <div>
                  <button className={styles.removeButton} onClick={() => setImage(null)}>
                    <MdDelete />
                    <span>Remove</span>
                  </button>
                </div>) : (
                <>
                  <div className={styles.Uploadarea}>
                    <button
                      className={`${styles.imageUploadButton} ${isDragging && styles.dragging}`}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      <Camera className={styles.icon} />
                      <span>Add Image</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </ImageUploading >

      <MyComponent
        containerStyle={mobileMapStyle}
        center={customCenter}
        zoom={16}
      />
      <label className={styles.description}>
        <p className={styles.detailWrap}>
          Address: {formData.address}
        </p>
        <textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Enter a landmark"></textarea>
        {/* Changed "div" tag to "small" tag and className="error" to  className={styles.error} */}
      </label>
      <br />
      <button type="button" onClick={handleNextPage} className={styles.next}>
        Next
      </button>
    </div >
  );
}

export default ImageAndLocationPage;
