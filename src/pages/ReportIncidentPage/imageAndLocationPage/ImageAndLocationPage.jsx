import React, { useState, useEffect, Suspense} from "react";
import ImageUploader from "../../../Components/ImageUploader/ImageUploader";
import { handleImageChange } from "./handleImageChange";
import styles from "./ImageAndLocationPage.module.css";
import MapSkeleton from "../../../Components/Skeletons/mapSkeleton";
const LazyMap = React.lazy(() => import("../../../Components/MapComponent/map"));

function ImageAndLocationPage({ formData, handleChange, handleNextPage, errors, setErrors, setFormData }) {
  const [AnimalType,setAnimalType] = useState(""); // State to store the detected animal type
  
  const onChange = (imageList) => {
    handleImageChange(imageList, handleChange, setAnimalType, setErrors, setFormData);
  };

  return (
    <div className={styles.container}>
      <h2>Upload Image and Location</h2>
      <ImageUploader formData={formData} setFormData={setFormData} onChange={onChange} />
      <Suspense fallback={<MapSkeleton />}>
        <LazyLoadedMap formData={formData} />
      </Suspense>
      <label className={styles.description}>
        <p className={styles.detailWrap}>Address: {formData.address?formData.address: "loading.."}</p>
        <textarea
          name="landmark"
          value={formData.landmark}
          onChange={handleChange}
          rows={3}
          placeholder="Enter a landmark"
        ></textarea>
      </label>
      <br />
      {errors && <p className={styles.errtext}>{errors.landmark || errors.image || errors.imgUpLoading||errors.latitude}</p>}
      <button type="button" onClick={handleNextPage} className={styles.next}>
        Next
      </button>
    </div>
  );
}

function LazyLoadedMap({ formData }) {
  const [customCenter, setCustomCenter] = useState([22.5629, 88.3962]);

  useEffect(() => {
    const latitude = parseFloat(formData.latitude);
    const longitude = parseFloat(formData.longitude);
    if (!isNaN(latitude) && !isNaN(longitude)) {
      setCustomCenter([latitude, longitude]);
    }
  }, [formData.latitude, formData.longitude]);

  return <LazyMap zoom={18} customCenter={customCenter} />;
}

export default ImageAndLocationPage;
