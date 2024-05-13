import React, { useState, useEffect, useRef, Suspense, useMemo } from "react";
import ImageUploader from "../../../Components/user/ImageUploader";
import { handleImageChange } from "./handleImageChange";
import Background from "../../../Components/shared/Background";
import MapSkeleton from "../../../Components/user/SkeletonLoaders/Map";
import Button from "../../../Components/shared/Button";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import axios from "axios";

const LazyMap = React.lazy(() =>
    import("../../../Components/user/Map")
);

function ImageAndLocationPage({
  formData,
  handleChange,
  handleNextPage,
  errors,
  setErrors,
  setFormData,
}) {
  //eslint-disable-next-line
  const [timerId, setTimerId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nearestNgo, setNearestNgo] = useState(null);

  useEffect(() => {
    const id = setTimeout(() => {
      const url = process.env.REACT_APP_BACKEND_URL;
      axios.get(`${url}/nearest_ngo?lat=${formData.latitude}&lon=${formData.longitude}`).then((response) => {
        setNearestNgo(response.data);
        setModalIsOpen(true);
      }).catch((error) => {
        console.error(error);
      });
    }, 30000);

    setTimerId(id);

    return () => clearTimeout(id);
  }, [formData.latitude, formData.longitude]);

  const onChange = (imageList) => {
    const currentLandmark = formData.landmark;
    handleImageChange(imageList, handleChange, setErrors, setFormData);
    if (currentLandmark !== undefined && currentLandmark !== null) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        landmark: currentLandmark,
      }));
    }
  };

  const prevLandmarkRef = useRef();

  const memoizedLandmark = useMemo(() => {
    if (formData.landmark !== "") {
      return formData.landmark;
    } else {
      return prevLandmarkRef.current;
    }
  }, [formData.landmark]);

  return (
    <div className="relative z-[3] h-fit w-full flex flex-col gap-3 justify-center items-center overflow-x-hidden">
      <Background />
      <Rodal
        visible={modalIsOpen}
        animation="zoom"
        showCloseButton
        closeMaskOnClick
        onClose={() => {
          setModalIsOpen(false);
        }}
        closeOnEsc
        className="bg-black bg-opacity-60  backdrop-blur-md "
        width={360}
        height={290}
      >
        <div className="flex flex-col relative w-full h-full">
          <p className="font-breeSerif text-xl mb-4 font-normal text-balance">
            Having issues ?
          </p>
          <p className="font-breeSerif text-lg mb-2 font-normal text-balance">
            Nearest Ngo :{" "}
            {nearestNgo === null ? "loading..." : nearestNgo.name}
          </p>
          <p className="font-breeSerif text-lg mb-2 font-normal text-balance">
            Contact Number :{" "}
            {nearestNgo === null ? "Loading..." : nearestNgo.phone_number}
          </p>
          <p className="font-breeSerif text-lg mb-13 font-normal text-balance">
            Emergency Contact Number :{" "}
            {nearestNgo === null
              ? "Loading..."
              : nearestNgo.emergency_contact_number}
          </p>
          <div className="absolute bottom-3 w-full  flex items-center justify-center"
          >
            <a
              href={`sms:${nearestNgo ? nearestNgo.phone_number : ''}?&body=Hello,%0A%0AI'm%20reporting%20an%20urgent%20animal%20rescue%20situation%20that%20needs%20immediate%20attention:%0A%0A- Description:%20[Data%20to%20describe%20what%20happened]%0A- Animal%20Type:%20[Species]%0A- Severity:%20[Urgency%20level]%0A- Location:%20${formData.address ? formData.address : "[Enter%20Your%20Address]"}%0A%0APlease%20let%20me%20know%20if%20you%20need%20further%20details%20or%20assistance.%0A%0AThank%20you,%0A`}
              className="px-4 py-4 bg-gradient-to-b tracking-wider rounded-2xl from-green-300 to-green-800 text-white shadow-lg"
            >
              Send Message Directly
            </a>

          </div>
        </div>
      </Rodal>

      <h1 className=" mt-5 text-center pb-1 pl-2 pr-2 z-[3] text-indigo-900 font-bold tracking-wide text-[1.5em] underline">
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

          <div className=" z-[30] justify-center flex flex-col justify-items-center gap-3">
            <label>
              <p className="text-base font-semibold pr-5 text-indigo-900 border-1 overflow-wrap break-word">
                Address: {formData.address ? formData.address : "loading.."}
              </p>
            </label>
            <textarea
              className="w-[21rem] flex items-center justify-center text-[1rem] p-2 rounded-3xl"
              name="landmark"
              value={memoizedLandmark}
              onChange={handleChange}
              rows={1}
              placeholder="Enter a landmark"
            ></textarea>

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
        clas="mb-24 font-semibold tracking-wider px-8 text-white bg-gradient-to-b from-green-500 to-green-600"
        onClick={handleNextPage} />
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
