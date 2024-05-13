import React, { useEffect, useState, useRef } from "react";
import "react-tooltip/dist/react-tooltip.css";
//eslint-disable-next-line
import styles from "./AnimalDetailsPage.module.css";
import { Tooltip } from "react-tooltip";
import Button from "../../../../Components/shared/Button";
import Background from "../../../../Components/shared/Background";
function AnimalDetailsPage({
  formData,
  setFormData,
  errors,
  handleChange,
  handleBackPage,
  handleNextPage,
}) {
  const [isDog, setIsDog] = useState(false);
  const [isCat, setIsCat] = useState(false);
  const [isCattle, setIsCattle] = useState(false);
  const [isBird, setIsBird] = useState(false);
  const [isSheep, setIsSheep] = useState(false);
  const [isPoultry, setIsPoultry] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const [isRabbit, setIsRabbit] = useState(false);
  const [key, setKey] = useState(0);
  const [isclass, setClass] = useState();

  const poultryRef = useRef(null);
  const birdRef = useRef(null);
  const sheepRef = useRef(null);
  const containerRef = useRef(null);
  const otherRef = useRef(null);
  const rabbitRef = useRef(null);
  useEffect(() => {
    if (
      formData.predictedAnimal === "poultry" &&
      poultryRef.current &&
      containerRef.current
    ) {
      const left = poultryRef.current.offsetLeft;
      containerRef.current.scrollLeft = left;
    } else if (
      formData.predictedAnimal === "bird" &&
      birdRef.current &&
      containerRef.current
    ) {
      const left = birdRef.current.offsetLeft;
      containerRef.current.scrollLeft = left;
    } else if (
      formData.predictedAnimal === "sheep" &&
      sheepRef.current &&
      containerRef.current
    ) {
      const left = sheepRef.current.offsetLeft;
      containerRef.current.scrollLeft = left;
    }else if (
      formData.predictedAnimal === null &&
      otherRef.current &&
      containerRef.current
    ) {
      const left = otherRef.current.offsetLeft;
      containerRef.current.scrollLeft = left;
    } else if (
      formData.predictedAnimal === "rabbit" &&
      rabbitRef.current &&
      containerRef.current
    ) {
      const left = rabbitRef.current.offsetLeft;
      containerRef.current.scrollLeft = left;
    }}, [isDog, isCat, isCattle, isBird, isSheep,isRabbit,isPoultry,isOther,formData.predictedAnimal]);

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
    } else if (formData.predictedAnimal === "bird") {
      setIsBird(true);
    } else if (formData.predictedAnimal === "sheep") {
      setIsSheep(true);
    } else if (formData.predictedAnimal === "poultry") {
      setIsPoultry(true);
    } else if (formData.predictedAnimal === "rabbit") {
      setIsRabbit(true);
    } else if (formData.predictedAnimal === null) {
      setFormData((prev) => ({ ...prev, animal_type: "other" }));
      setIsOther(true);
    }
  }, [formData.predictedAnimal,setFormData]);

  useEffect(() => {
    setClass(true);
    setTimeout(() => {
      setClass(false);
    }, 10000);
  }, [formData.predictedAnimal]);
  return (
    // A MASTER CONTAINER
    <div>
      <Background />
      <h1 className="text-center mt-[20px] pb-1 z-[3] text-indigo-900 font-bold tracking-wide text-[2em] underline">
        Describe The Issue
      </h1>
      <div style={{ position: "relative", zIndex: 50 }}>
        <Tooltip
          key={key}
          anchorSelect=".show-tooltip"
          isOpen={isclass}
          disableStyleInjection={true}
        />
      </div>

      {/* contentsContainer */}
        <>
          <div className="relative z-[3] flex flex-col p-4 gap-5 mb-20  ">
            <div className=" p-[10px] border-1 flex flex-col gap-[10px] rounded-3xl shadow-lg ring-1 ring-gray-300 bg-opacity-57 bg-white  backdrop-blur-[6px]">
              <label>
                <p className="font-extrabold  text-indigo-900 pl-5 text-[1.4rem] leading-normal tracking-wider overflow-scroll">
                  {" "}
                  Animal Type:
                </p>
              </label>
              <div
                ref={containerRef}
                className="flex overflow-x-auto gap-4 scrollbar-hide z-[5]"
              >
                {/* DOG */}
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
                    <div className=" w-[80px] h-[80px] relative mb-[8px] ">
                      <img
                        className="rounded-[50%] w-full  h-full object-cover object-center"
                        src="./images/dog.jpg"
                        alt=""
                      />
                    </div>
                  </label>
                </div>
                {/* CAT */}
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
                    <div className=" w-[80px] h-[80px] relative mb-[8px] ">
                      <img
                        className="rounded-[50%] w-full  h-full object-cover object-center "
                        src="./images/cat.jpg"
                        alt=""
                      />
                    </div>
                  </label>
                </div>
                {/* CATTLE */}
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
                    <div className=" w-[80px] h-[80px] mb-[8px] relative ">
                      <img
                        className="rounded-[50%] w-full  h-full object-cover object-center  "
                        src="./images/cow.jpg"
                        alt=""
                      />
                    </div>
                  </label>
                </div>
                {/* BIRD */}
                <div
                  ref={birdRef}
                  className={isBird ? "show-tooltip" : ""}
                  data-tooltip-html="<b>Predicted<br>To be a bird.</b>"
                >
                  <input
                    type="radio"
                    id="bird"
                    name="predictedAnimal"
                    value="bird"
                    checked={
                      formData.predictedAnimal === "bird" ||
                      formData.animal_type === "bird"
                    }
                    onChange={handleChange}
                    hidden
                  />
                  <label htmlFor="bird">
                    <div className="w-[80px] h-[80px] relative mb-[8px]">
                      <img
                        className="rounded-[50%] w-full h-full object-cover object-center"
                        src="./images/bird.jpeg"
                        alt=""
                      />
                    </div>
                  </label>
                </div>
                {/* POULTRY */}

                <div
                  ref={poultryRef}
                  className={isPoultry ? "show-tooltip" : ""}
                  data-tooltip-html="<b>Predicted<br>To be a poultry.</b>"
                >
                  <input
                    type="radio"
                    id="poultry"
                    name="predictedAnimal"
                    value="poultry"
                    checked={
                      formData.predictedAnimal === "poultry" ||
                      formData.animal_type === "poultry"
                    }
                    onChange={handleChange}
                    hidden
                  />
                  <label htmlFor="poultry">
                    <div className="w-[80px] h-[80px] relative mb-[8px]">
                      <img
                        className="rounded-[50%] w-full h-full object-cover object-center"
                        src="./images/poultry.jpeg"
                        alt=""
                      />
                    </div>
                  </label>
                </div>
                {/* SHEEP */}
                <div
                  ref={sheepRef}
                  className={isSheep ? "show-tooltip" : ""}
                  data-tooltip-html="<b>Predicted<br>To be a sheep.</b>"
                >
                  <input
                    type="radio"
                    id="sheep"
                    name="predictedAnimal"
                    value="sheep"
                    checked={
                      formData.predictedAnimal === "sheep" ||
                      formData.animal_type === "sheep"
                    }
                    onChange={handleChange}
                    hidden
                  />
                  <label htmlFor="sheep">
                    <div className="w-[80px] h-[80px] relative mb-[8px]">
                      <img
                        className="rounded-[50%] w-full h-full object-cover object-center"
                        src="./images/sheep.jpg"
                        alt=""
                      />
                    </div>
                  </label>
                </div>
                {/* RABBIT */}
                <div
                  ref={rabbitRef}
                  className={isRabbit ? "show-tooltip" : ""}
                  data-tooltip-html="<b>Predicted<br>To be a rabbit.</b>"
                >
                  <input
                    type="radio"
                    id="rabbit"
                    name="predictedAnimal"
                    value="rabbit"
                    checked={
                      formData.predictedAnimal === "rabbit" ||
                      formData.animal_type === "rabbit"
                    }
                    onChange={handleChange}
                    hidden
                  />
                  <label htmlFor="rabbit">
                    <div className="w-[80px] h-[80px] relative mb-[8px]">
                      <img
                        className="rounded-[50%] w-full h-full object-cover object-center"
                        src="./images/rabbit.jpg"
                        alt=""
                      />
                    </div>
                  </label>
                </div>
                {/* OTHER */}
                <div
                  ref={otherRef}
                  className={isOther ? "show-tooltip" : ""}
                  // data-tooltip-html="<b>Predicted<br>To be Anirban.</b>"
                >
                  <input
                    type="radio"
                    id="other"
                    name="predictedAnimal"
                    value="other"
                    checked={formData.predictedAnimal === null || formData.animal_type === "other"}
                    onChange={handleChange}
                    hidden
                  />
                  <label htmlFor="other">
                    <div className=" w-[80px] h-[80px] relative mb-[8px]">
                      <img
                        className="rounded-[50%] w-full  h-full object-cover object-center "
                        src="./images/more.jpg"
                        alt=""
                      />
                    </div>
                  </label>
                </div>
              </div>
              {/* OPTION:otherS */}
              {(formData.predictedAnimal===null || formData.animal_type==="other") && (
                <label className=" text-xl flex items-center gap-2">
                  Please specify:
                  <input
                    className="w-1/2 h-8 p-2 text-sm rounded-lg bg-white border-2 border-zinc-800 "
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
              <small className="text-sm text-red-500">
                {errors.description}
              </small>
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
              <Button
                text="Back"
                clas="font-semibold tracking-wider px-6 font-poppins text-white"
                onClick={handleBackPage}
              />
              <Button
                text="Next"
                clas="font-semibold tracking-wider px-6 text-white bg-gradient-to-b from-blue-600 to-blue-800 shadow-buttonShadow focus:outline-none "
                onClick={handleNextPage}
              />
            </div>
          </div>
        </>
      
    </div>
  );
}

export default AnimalDetailsPage;
