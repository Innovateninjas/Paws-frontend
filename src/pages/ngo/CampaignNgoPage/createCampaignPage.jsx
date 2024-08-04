// CreateButton.js
import React from "react";
import MButton from "../../../Components/ngo/Button";
import Background from "../../../Components/shared/Background";


const CreateCampaignPage = ({ onClick }) => {
  return (
    <>
      <Background />
      <div className=" h-[60vh] flex z-[60] items-center justify-between flex-col">

        <h1 className="mt-[40px] text-[#40025D] text-center w-[90vw] backdrop-blur-[6px] font-baloo text-shadow shadow-custom bg-white bg-opacity-[0.5] rounded-[50px] py-[40px] px-[20px]">

          <p className="text-[2rem] lg:text-[3rem] md:text-[2.2rem] leading-10 animate-fade-in-campaign font-extrabold flex flex-col gap-5 md:flex-row md:justify-center">
            <span>Protecting Paws,</span>
            <span>Saving Lives</span>
          </p>
        </h1>
        <div>
          <MButton text="Create Campaign" onClick={onClick}/>
        </div>
      </div>
    </>
  );
};

export default CreateCampaignPage;
