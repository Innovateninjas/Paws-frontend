import React, { useState, useEffect, Suspense } from "react";
import ImageUploader from "../../../Components/ImageUploader/ImageUploader";
import { handleImageChange } from "./handleImageChange";
import Background from "../../../Components/backgroundComponent/Background";
import MapSkeleton from "../../../Components/Skeletons/mapSkeleton";
import Button from "../../../Components/tailwindButton/Button";

const LazyMap = React.lazy(() =>
  import("../../../Components/MapComponent/map")
);

function ImageAndLocationPage({
  formData,
  handleChange,
  handleNextPage,
  errors,
  setErrors,
  setFormData,
}) {
  const onChange = (imageList) => {
    handleImageChange(imageList, handleChange, setErrors, setFormData);
  };

  return (
    <div className="relative z-[3] h-fit w-full flex flex-col gap-3 justify-center items-center overflow-x-hidden">
      <Background />
      <h1 className=" mt-5 text-center pb-1 z-[3] text-indigo-900 font-bold tracking-wide text-[2em] underline">
        Upload Image and Location
      </h1>
      <ImageUploader
        formData={formData}
        setFormData={setFormData}
        onChange={onChange}
      />
      <div className="w-[23rem]  z-[30] bg-white rounded-3xl bg-opacity-57 backdrop-blur-[5px] shadow-lg ring-1 ring-gray-300">

      <div className=" flex-col justify-center items-center gap-6 p-4   ">
     <div className="w-full h-[200px] flex pb-5">
          <Suspense fallback={<MapSkeleton />}>
            <LazyLoadedMap formData={formData} />
          </Suspense>
        </div>
      
      <div className="w-[23rem]  z-[30] justify-center items-center flex flex-col justify-items-center">
        <label>
          <p className="text-base  font-semibold pb-3 pr-1 text-indigo-900 border-1">
            Address: {formData.address ? formData.address : "loading.."}
          </p>
          <textarea
            className="w-[21rem] flex items-center justify-center text-[1rem] p-2 rounded-3xl"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            rows={1}
            placeholder="Enter a landmark"
          ></textarea>
        </label>
      </div>
      </div>
</div>
      {errors && (
        <p className="text-red-500">
          {errors.landmark ||
            errors.image ||
            errors.imgUpLoading ||
            errors.latitude}
        </p>
      )}
          <Button 
            text="Next" 
            clas="mb-24 px-16 py-4 bg-gradient-to-b from-green-300 to-green-800 text-white shadow-lg" 
            onClick={handleNextPage}/>
    </div>
  );
}

function LazyLoadedMap({ formData }) {
  const [customCenter, setCustomCenter] = useState([22.5595, 88.39644]);

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
