import React, { useState, useEffect, Suspense } from "react";
import ImageUploader from "../../../Components/ImageUploader/ImageUploader";
import { handleImageChange } from "./handleImageChange";
import styles from "./ImageAndLocationPage.module.css";
import MapSkeleton from "../../../Components/Skeletons/mapSkeleton";
const LazyMap = React.lazy(() => import("../../../Components/MapComponent/map"));

function ImageAndLocationPage({ formData, handleChange, handleNextPage }) {
  const [image, setImage] = useState(null);

  const onChange = (imageList) => {
    handleImageChange(imageList, setImage, handleChange);
  };

  return (
    <div className={styles.container}>
      <h2>Upload Image and Location</h2>
      <ImageUploader image={image} setImage={setImage} onChange={onChange} />
      <Suspense fallback={
      <MapSkeleton />
      }>
        <LazyLoadedMap formData={formData} />
      </Suspense>
      <label className={styles.description}>
        <p className={styles.detailWrap}>Address: {formData.address}</p>
        <textarea
          name="landmark"
          value={formData.landmark}
          onChange={handleChange}
          rows={3}
          placeholder="Enter a landmark"
        ></textarea>
      </label>
      <br />
      <button type="button" onClick={handleNextPage} className={styles.next}>
        Next
      </button>
    </div>
  );
}

function LazyLoadedMap({ formData }) {
  const [customCenter, setCustomCenter] = useState([22.5726, 88.3639]);

  useEffect(() => {
    const latitude = parseFloat(formData.latitude);
    const longitude = parseFloat(formData.longitude);

    if (!isNaN(latitude) && !isNaN(longitude)) {
      setCustomCenter([latitude, longitude]);
    }
  }, [formData.latitude, formData.longitude]);

  return <LazyMap zoom={13} center={customCenter} />;
}

export default ImageAndLocationPage;
