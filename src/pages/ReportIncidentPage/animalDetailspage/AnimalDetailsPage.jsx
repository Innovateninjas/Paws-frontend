import React, { useEffect, useState } from "react";
import styles from "./AnimalDetailsPage.module.css";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import Button from "../../../Components/tailwindButton/Button";
import Background from "../../../Components/backgroundComponent/Background";
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
    <div >
    <Background/>
      <h1 className="text-center mt-[20px] pb-1 z-[3] text-indigo-900 font-bold tracking-wide text-[2em] underline">
        Describe The Issue
      </h1>
      <Tooltip
        key={key}
        anchorSelect=".show-tooltip"
        isOpen={formData}
        disableStyleInjection={true}
      />
      {/* contentsContainer */}
      <div className="relative z-[3] flex flex-col p-4 gap-5 mb-20  ">
      <div className=" p-[10px] border-1 flex flex-col gap-[10px] rounded-3xl shadow-lg ring-1 ring-gray-300 bg-opacity-57 bg-white overflowX-scroll backdrop-blur-[6px]">
          <label>
            <p className="font-extrabold  text-indigo-900 pl-5 text-[1.4rem] leading-normal tracking-wider overflow-scroll">
              {" "}
              Animal Type:
            </p>
          </label>
          <div className="flex overflow-x-auto gap-4 scrollbar-hide z-[5]">
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
              <div className=" w-[72px] h-[72px] relative mb-[8px] ">
                <img className="rounded-[50%] w-full  h-full object-cover object-center" src="./images/dog.jpg" alt="" />
                </div>
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
              <div className=" w-[72px] h-[72px] relative mb-[8px] ">
                <img className="rounded-[50%] w-full  h-full object-cover object-center " src="./images/cat.jpg" alt="" />
                </div>
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
              <div className=" w-[72px] h-[72px] mb-[8px] relative ">
                <img className="rounded-[50%] w-full  h-full object-cover object-center  " src="./images/cow.jpg" alt="" />
                </div>
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
              <div className=" w-[72px] h-[72px] relative mb-[8px]">
                <img className="rounded-[50%] w-full  h-full object-cover object-center " src="./images/more.jpg" alt="" />
                </div>
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
        
        <div className="bg-white bg-opacity-57 shadow-lg ring-1 ring-gray-300 flex flex-col gap-2 justify-center border-1 p-4 rounded-3xl backdrop-blur-[6px]">
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
                className="w-9 h-9 "
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
                className="w-9 h-9"
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
                className="w-9 h-9"
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
        <div className="bg-white bg-opacity-57 shadow-lg ring-1 ring-gray-300 flex flex-col justify-center border-1 gap-2 p-5 rounded-3xl backdrop-blur-[6px]">
          <label>
            <p className="font-extrabold  text-indigo-900 pl-5 text-[1.3rem] leading-normal tracking-[0.02rem]">
              Describe what Happened:
            </p>
          </label>
          <textarea
            className="pt-3 pl-2  m-auto rounded-[10px] border-0 outline-none text-gray-800 w-[90%] h-12 "
            name="description"
            value={formData.description || formData.predictedDescription}
            onChange={handleChange}
            rows={4}
            placeholder="Describe here"
          ></textarea>
          <small className="text-sm text-red-500">{errors.description}</small>
        </div>

        {/* DESCRIBE SEVERITY */}
        <div className="bg-white bg-opacity-57 shadow-lg ring-1 ring-gray-300 flex flex-col gap-2 justify-center border-1 p-5 rounded-3xl backdrop-blur-[6px]">
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
          </label>
          <small className="text-sm text-red-500">{errors.condition}</small>
        </div>

        {/* BUTTONS */}
        <div className="mt-4 w-full flex flex-wrap justify-evenly gap-4">
            <Button text="Back" clas=" text-base text-white focus:outline-none rounded-[30px] shadow-buttonShadow font-semibold bg-gradient-to-b from-green-300 to-green-800"  onClick={handleBackPage}/>
          <Button text="Next" clas="text-base  text-white bg-gradient-to-b from-blue-300 to-blue-800 shadow-buttonShadow focus:outline-none rounded-[30px]  bg-opacity-20 font-semibold"  onClick={handleNextPage}/>
        </div>
      </div>
    </div>
  );
}

export default AnimalDetailsPage;
