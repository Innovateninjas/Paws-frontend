// CreateButton.js
import React from "react";
import { FaPlus } from "react-icons/fa";
import styles from "./createCampaign.module.css";
import MButton from "../../../Components/buttons/MediumButton/mButton";
import Background from "../../../Components/backgroundComponent/Background";
import Campaignbackground from "../../../Components/CampaignBackground/campaignbackground";
const CreateCampaignPage = ({ onClick }) => {
  return (
    <>
      <Background />
      <div className=" h-[60vh] flex z-[60] items-center justify-between flex-col">

        <h1 className="mt-[40px] text-[#40025D] text-center w-[90vw] backdrop-blur-[6px] font-baloo text-shadow shadow-custom bg-gradient-to-b from-campaign-input-top via-campaign-input-middle to-campaign-input-bottom rounded-[50px] py-[40px] px-[20px]">

          <p className="text-[2rem] leading-10 font-extrabold flex flex-col gap-5">
            <span>Protecting Paws,</span>
            <span>Saving Lives</span>
          </p>
        </h1>
        <div>
          <MButton text="Create Campaign" onClick={onClick} />
        </div>
      </div>
    </>
  );
};

export default CreateCampaignPage;
