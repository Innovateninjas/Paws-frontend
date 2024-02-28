import React, { useState, useEffect, Suspense} from "react";
import ImageUploader from "../../../Components/ImageUploader/ImageUploader";
import { handleImageChange } from "./handleImageChange";
import styles from "./ImageAndLocationPage.module.css";
import MapSkeleton from "../../../Components/Skeletons/mapSkeleton";
const LazyMap = React.lazy(() => import("../../../Components/MapComponent/map"));

function ImageAndLocationPage({ formData, setFormData, handleChange, handleNextPage,errors}) {
  const [image, setImage] = useState(null);
  const [setAnimalType] = useState(""); // State to store the detected animal type

  const onChange = (imageList) => {
    handleImageChange(imageList, setImage, handleChange, setAnimalType);
  };

  return (
    <div className={styles.container}>
      <h2>Upload Image and Location</h2>
      <ImageUploader image={image} setImage={setImage} onChange={onChange} />
      <Suspense fallback={<MapSkeleton />}>
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
