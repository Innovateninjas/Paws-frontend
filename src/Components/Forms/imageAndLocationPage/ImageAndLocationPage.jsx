import React, { useState } from "react";
import ImageUploading from 'react-images-uploading';
import { RiDeleteRow } from 'react-icons/ri';
import { Camera } from 'react-bootstrap-icons';
import styles from "./ImageAndLocationPage.module.css";

function ImageAndLocationPage({ formData, errors, handleChange, handleNextPage }) {
  const [images, setImages] = useState([]);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
    if (imageList.length > 0) {
      handleChange({
        target: {
          name: "image",
          value: imageList[0].data_url // Assuming you only allow one image
        }
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2>Page 1: Image and Location</h2>
      <ImageUploading
        value={images}
        onChange={onChange}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div>
            <button
              className={`${styles.imageUploadButton} ${isDragging && styles.dragging}`}
              onClick={onImageUpload}
              {...dragProps}
            >
              {imageList.length === 0 ? (
                <>
                  <Camera className={styles.icon} />
                  <span>Click or Drop here</span>
                </>
              ) : (
                <span>Change Image</span>
              )}
            </button>
            <div className={styles.imageList}>
              {imageList.map((image, index) => (
                <div key={index} className={styles.imageItem}>
                  <img src={image['data_url']} alt="" className={styles.imagePreview} />
                  <button className={styles.removeButton} onClick={() => onImageRemove(index)}>
                    <RiDeleteRow />
                    <span>Remove</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
      <br />
      <p>
        User's Location: Latitude {formData.latitude}, Longitude {formData.longitude}
      </p>
      <p>
        Address: {formData.address}
      </p>
      <br />
      <button type="button" onClick={handleNextPage}>
        Next
      </button>
    </div>
  );
}

export default ImageAndLocationPage;