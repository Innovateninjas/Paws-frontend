import React, { useEffect, useState } from "react";
import styles from "./AnimalDetailsPage.module.css";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
function AnimalDetailsPage({
  formData,
  errors,
  handleChange,
  handleBackPage,
  handleNextPage,
}) {
  const [isDog, setIsDog] = useState(false);
  const [isCat, setIsCat] = useState(false);
  const [isCattle, setIsCattle] = useState(false);
  const [key, setKey] = useState(0);
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (formData.predictedAnimal === "dog") {
      setIsDog(true);
    } else if (formData.predictedAnimal === "cat") {
      setIsCat(true);
    } else if (formData.predictedAnimal === "cattle") {
      setIsCattle(true);
    }
  }, [formData.predictedAnimal]);

  setTimeout(() => {
    const elements = document.querySelectorAll(".show-tooltip");
    setKey((prev) => prev + 1);
    elements.forEach((element) => {
      element.classList.remove("show-tooltip");
    });
  }, 4000);

  return (
    // A MASTER CONTAINER
    <div className=" bg-gradient-to-b from-green-200 to-lime-300 relative z-10 w-full p-4 flex flex-col gap-5 justify-center overflow-x-hidden">
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
      <h1 className="text-center pb-1 z-[3] text-indigo-900 font-bold tracking-wide text-[2em] underline">
        Describe The Issue
      </h1>
      <Tooltip
        key={key}
        anchorSelect=".show-tooltip"
        isOpen={formData}
        disableStyleInjection={true}
      />
      {/* USED RADIO INPUT INSTEAD OF SELECT TAG */}
      <div className="relative z-[3] flex flex-col gap-5 mb-20">
      <div className="p-[10px] flex flex-col gap-[10px] rounded-3xl border  bg-opacity-60 bg-slate-300 shadow-custom">
 

          <label>
            <p className="font-extrabold  text-indigo-900 pl-5 text-[1.4rem] leading-normal tracking-wider">
              {" "}
              Animal Type:
            </p>
          </label>
          <div className="flex gap-[10px] justify-evenly overflow-x-auto scrollbar-hidden">
            <div
              className={isDog ? "show-tooltip" : ""}
              data-tooltip-html="<b>Predicted<br>To be a dog</b>"
            >
              <input
                type="radio"
                id="dog"
                name="predictedAnimal"
                value="dog"
                checked={
                  formData.predictedAnimal === "dog" ||
                  formData.animal_type === "dog"
                }
                onChange={handleChange}
                hidden
              />
              <label htmlFor="dog">
                <img className="rounded-full w-[72px] h-[72px] mb-2 object-cover object-center shadow-custom" src="./images/dog.jpg" alt="" />
              </label>
            </div>
            <div
              className={isCat ? "show-tooltip" : ""}
              data-tooltip-html="<b>Predicted<br>To be a Cat</b>"
            >
              <input
                type="radio"
                id="cat"
                name="predictedAnimal"
                value="cat"
                checked={
                  formData.predictedAnimal === "cat" ||
                  formData.animal_type === "cat"
                }
                onChange={handleChange}
                hidden
              />

              <label htmlFor="cat">
                <img className="rounded-full w-[72px] h-[72px] mb-2 object-cover object-center shadow-custom" src="./images/cat.jpg" alt="" />
              </label>
            </div>
            <div
              className={isCattle ? "show-tooltip" : ""}
              data-tooltip-html="<b>Predicted<br>To be a Cattle</b>"
            >
              <input
                type="radio"
                id="cattle"
                name="predictedAnimal"
                value="cattle"
                checked={
                  formData.predictedAnimal === "cattle" ||
                  formData.animal_type === "cattle"
                }
                onChange={handleChange}
                hidden
              />
              <label htmlFor="cattle">
                <img className="rounded-full w-[72px] h-[72px] object-cover mb-2 object-center shadow-custom" src="./images/cow.jpg" alt="" />
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="other"
                name="predictedAnimal"
                value="other"
                checked={formData.animal_type === "other"}
                onChange={handleChange}
                hidden
              />
              <label htmlFor="other">
                <img className="rounded-full w-[72px] h-[72px] mb-2 object-cover object-center shadow-custom" src="./images/more.jpg" alt="" />
              </label>
            </div>
          </div>

          {/* OPTION:otherS */}
          {formData.animal_type === "other" && (
            <label className=" text-xl flex items-center gap-2">
              Please specify:
              <input
               className="w-1/2 h-6 rounded-lg bg-white border-2 border-zinc-800 "
                type="text"
                name="otherAnimalType"
                onChange={handleChange}
              />
            </label>
          )}
        </div>
        {/* HOW MANY ANIMALS */}
        <div className="p-2 flex flex-col gap-2 rounded-[30px] bg-opacity-60 bg-lime-300 shadow-custom">
          <label>
            <p className="font-extrabold  text-indigo-900 pl-5 text-[1.4rem] leading-normal tracking-wider">
              {" "}
              How many animals:
            </p>
          </label>
          <div className="w-full flex justify-evenly">
            <label className="flex flex-col items-center justify-center text-lg font-medium">
              <p>One</p>
              <input
                type="radio"
                className="w-[35px] h-[35px] "
                name="numberOfAnimals"
                value="One"
                checked={
                  formData.numberOfAnimals === "One" ||
                  formData.predictedNumberOfAnimals === "one"
                }
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col items-center justify-center text-lg font-medium">
              <p>Two</p>

              <input
                type="radio"
                className="w-[35px] h-[35px]"
                name="numberOfAnimals"
                value="Two"
                checked={
                  formData.numberOfAnimals === "Two" ||
                  formData.predictedNumberOfAnimals === "two"
                }
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col items-center justify-center text-lg font-medium">
              <p>More</p>
              <input
                className="w-[35px] h-[35px]"
                type="radio"
                name="numberOfAnimals"
                value="More"
                checked={
                  formData.numberOfAnimals === "More" ||
                  formData.predictedNumberOfAnimals === "more"
                }
                onChange={handleChange}
              />
            </label>
          </div>
          <small></small>
        </div>

        {/* DESCRIBE WHAT  HAPPENED */}
        <div className="flex flex-col justify-center  rounded-[30px] p-[10px] bg-gradient-to-b from-gradient-start via-gradient-middle to-gradient-end space-y-5 border-0 shadow-custom">
          <label>
            <p className="font-extrabold  text-indigo-900 pl-5 text-[1.4rem] leading-normal tracking-[0.02rem]">
              Describe what Happened:
            </p>
          </label>
          <textarea
            className="p-2 m-auto rounded-[10px] border-0 outline-none text-gray-800 w-[90%] h-16 "
            name="description"
            value={formData.description || formData.predictedDescription}
            onChange={handleChange}
            rows={4}
            placeholder="Describe here"
          ></textarea>
          {/* Changed "div" tag to "small" tag and className="error" to  className={styles.error} */}

          <small className="text-sm text-red-500">{errors.description}</small>
        </div>

        {/* DESCRIBE SEVERITY */}
        <div className="flex flex-col justify-center rounded-3xl gap-[10px] p-[10px] bg-opacity-60 bg-white border border-solid border-gray-400 border-opacity-60 shadow-custom">
          <label>
            {" "}
            <p className="font-extrabold  text-indigo-900 pl-5 text-[1.4rem] leading-normal tracking-wider">
              Describe Severity:
            </p>
          </label>

          <label className="flex flex-row justify-evenly">
            <div className="flex flex-col-reverse items-center justify-center">
              <input
                type="radio"
                className="w-9 h-9"
                id="urgent"
                name="condition"
                value="Urgent"
                checked={formData.condition === "Urgent"}
                onChange={handleChange}
              />
              <label htmlFor="urgent" className="text-lg font-medium">
                Urgent
              </label>
            </div>
            <div className="flex flex-col-reverse items-center justify-center text-lg font-semibold">
              <input
                type="radio"
                className="w-9 h-9"
                id="Critical"
                name="condition"
                value="Critical"
                checked={formData.condition === "Critical"}
                onChange={handleChange}
              />
              <label htmlFor="Critical" className="text-lg font-medium">
                Critical
              </label>
            </div>
            <div className="flex flex-col-reverse items-center justify-center text-lg font-semibold">
              <input
                type="radio"
                className="w-9 h-9"
                id="Normal"
                name="condition"
                value="Normal"
                checked={formData.condition === "Normal"}
                onChange={handleChange}
              />
              <label htmlFor="Normal" className="text-lg font-medium">
                Normal
              </label>
            </div>
            {/* Changed "div" tag to "small" tag and className="error" to  className={styles.error} */}
          </label>
          <small className="text-sm text-red-500">{errors.condition}</small>
        </div>
        

        {/* BUTTONS */}
        <div className="mt-4 w-full flex justify-evenly gap-4">
          {/* ADD AN EVENT AHNDLER FOR BACK BUTTON */}
          <button
            type="button"
            className="text-base text-gray-800 bg-slate-200 focus:outline-none rounded-full px-10 py-4 bg-opacity-80 font-semibold shadow-custom"
            onClick={handleBackPage}
          >
            Back
          </button>
          <button
            type="button"
            className="text-base text-gray-800 bg-gradient-to-b from-indigo-300 to-indigo-800 focus:outline-none rounded-[30px] px-10 py-4 bg-opacity-20 font-semibold shadow-custom"
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnimalDetailsPage;
