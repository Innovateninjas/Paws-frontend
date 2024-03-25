import React, { useState, useEffect, Suspense} from "react";
import ImageUploader from "../../../Components/ImageUploader/ImageUploader";
import { handleImageChange } from "./handleImageChange";
import styles from "./ImageAndLocationPage.module.css";
import MapSkeleton from "../../../Components/Skeletons/mapSkeleton";
const LazyMap = React.lazy(() => import("../../../Components/MapComponent/map"));

function ImageAndLocationPage({ formData, handleChange, handleNextPage, errors, setErrors, setFormData }) {
  
  
  const onChange = (imageList) => {
    handleImageChange( imageList, handleChange,  setErrors, setFormData);
  };

  return (
    <div style={{ position: 'relative' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></div>
    <div className=" bg-gradient-to-b from-green-200 to-lime-300 relative z-10 w-full  flex flex-col gap-5 justify-center overflow-x-hidden">
      <div className={styles.svgs}>
        <div className={styles.svgContainer4}>
          <svg
            width="355"
            height="413"
            viewBox="0 0 932 1040"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M369.268 -46.7978C511.721 -21.0485 571.405 157.578 671.087 274.378C766.547 386.233 925.092 457.74 931.73 612.262C938.459 768.893 818.142 897.317 701.586 984.289C604.982 1056.37 485.065 1041.31 369.268 1031.96C265.38 1023.58 151.123 1021.13 81.635 934.265C14.2166 849.989 51.8824 723.51 33.5171 612.262C6.68525 449.728 -121.927 287.835 -48.7829 144.257C28.7337 -7.90337 214.799 -74.7192 369.268 -46.7978Z"
              fill="url(#paint0_linear_1_6)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1_6"
                x1="1481.9"
                y1="1832.22"
                x2="1481.9"
                y2="2925.22"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#B1FFDE" />
                <stop offset="0.445" stopColor="#11FF9B" stopOpacity="0.31" />
                <stop offset="1" stopColor="#00E0FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className={styles.svgContainer1}>
          <svg
            width="335"
            height="413"
            viewBox="0 0 933 1125"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M496.172 -170.328C683.546 -203.991 877.1 -105.851 1004.58 24.6347C1126.48 149.402 1157.19 324.324 1142.68 491.397C1129.37 644.54 1044.01 777.2 929.464 889.193C810.184 1005.81 669.382 1140.92 496.172 1123.47C328.475 1106.58 247.185 936.194 148.551 810.541C71.9629 712.974 -1.05634 611.656 0.0115714 491.397C1.07132 372.056 80.4638 275.719 154.173 177.415C254.444 43.6842 322.625 -139.15 496.172 -170.328Z"
              fill="url(#paint0_linear_1_5)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1_5"
                x1="1963.13"
                y1="-422.549"
                x2="1963.13"
                y2="879.451"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ABF5FF" />
                <stop
                  offset="0.766667"
                  stopColor="#28E5FF"
                  stopOpacity="0.45"
                />
                <stop
                  offset="0.996667"
                  stopColor="#00DBF9"
                  stopOpacity="0.65"
                />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className={styles.svgContainer2}>
          <svg
            width="335"
            height="413"
            viewBox="0 0 585 1233"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M121.086 28.2963C264 -6.06704 435.362 -36.3278 530.511 110.71C627.594 260.735 571.485 482.582 540.801 676.894C509.166 877.228 495.828 1119.82 357.467 1206.54C219.862 1292.8 74.0092 1148.6 -60.4086 1053.74C-185.798 965.255 -345.828 885.372 -364.505 697.053C-382.532 515.295 -233.396 402.834 -137.997 271.451C-60.632 164.904 11.9182 54.5456 121.086 28.2963Z"
              fill="url(#paint0_linear_1_3)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1_3"
                x1="109.5"
                y1="0"
                x2="109.5"
                y2="1233"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#48DDFE" stopOpacity="0.34" />
                <stop offset="0.545" stopColor="#2E1EE4" stopOpacity="0.61" />
                <stop offset="0.965" stopColor="#369DFC" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute top-[20%] right-[15%] w-1/2 z-0">
          <svg
            width="335"
            height="413"
            viewBox="0 0 765 1259"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M827.99 428.445C907.085 540.168 1081.44 576.156 1097.85 716.399C1116.68 877.241 1050.01 1062.29 915.122 1172.9C783.061 1281.2 606.129 1258.55 444.329 1252.33C289.221 1246.37 95.2836 1266.59 21.5566 1138.55C-50.5498 1013.32 84.3447 854.807 130.033 706.493C162.044 602.575 184.469 505.387 245.302 412.217C346.569 257.117 413.805 -4.46077 591.006 0.474359C769.116 5.4348 730.368 290.553 827.99 428.445Z"
              fill="url(#paint0_linear_1_4)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1_4"
                x1="968.647"
                y1="366.663"
                x2="49.6896"
                y2="1175.85"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#E4FDFA" stopOpacity="0.56" />
                <stop
                  offset="0.821572"
                  stopColor="#54F2DF"
                  stopOpacity="0.58"
                />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      
          {/* SVG code here */}
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} className=" z-[30] flex flex-col items-center" >
          <h1 className="text-center z-[30] text-indigo-900 font-bold tracking-wide text-[2em] underline">Upload Image and Location</h1>
          <ImageUploader formData={formData} setFormData={setFormData} onChange={onChange} />
          <div className="w-[23rem] h-[13rem] z-[30] bg-emerald-300 flex justify-center items-center rounded-b-none p-4 pb-0 rounded-3xl bg-opacity-65 backdrop-blur-md">
            <div className="w-full h-full flex">
              <Suspense fallback={<MapSkeleton />}>
                <LazyLoadedMap formData={formData} />
              </Suspense>
            </div>
            </div>
            <div className="w-[23rem] h-[10rem] z-[30] bg-emerald-300  justify-center items-center rounded-t-none rounded-3xl bg-opacity-65 backdrop-blur-md pt-0 pb-0 pl-2 pr-2 flex flex-col justify-items-center">
              <label>
                <p className="text-base pt-0 pb-7">Address: {formData.address ? formData.address : "loading.."}</p>
                <textarea
                  className="w-[21rem] flex items-center justify-center ml-2 text-large  p-2 rounded-lg"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  rows={1}
                  placeholder="Enter a landmark"
                ></textarea>
              </label>
            </div>
          
          {errors && <p className={styles.errtext}>{errors.landmark || errors.image || errors.imgUpLoading || errors.latitude}</p>}
          <button 
    type="button" 
    onClick={handleNextPage} 
    className="text-base mt-3 text-gray-800 bg-gradient-to-b from-indigo-300 to-indigo-800 bg-opacity-75 focus:outline-none rounded-[30px] px-20 py-4 font-semibold "
>
    Next
</button>
        </div>
      </div>
  );
}

function LazyLoadedMap({ formData }) {
  const [customCenter, setCustomCenter] = useState([22.55950,88.39644]);

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
