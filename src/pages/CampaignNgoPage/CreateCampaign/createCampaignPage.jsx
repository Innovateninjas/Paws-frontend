// CreateButton.js
import React from "react";
import { FaPlus } from "react-icons/fa";
import styles from "./createCampaign.module.css";
import MButton from "../../../Components/buttons/MediumButton/mButton";
import Background from "../../../Components/backgroundComponent/Background";

const CreateCampaignPage = ({ onClick }) => {
  return (
    <>
      <Background />
      <div className=" h-[60vh] flex z-[60] items-center justify-between flex-col">
        <h1 className="mt-[40px] font-semibold text-center w-[90vw] backdrop-blur-[6px] font-BigShotOne text-shadow shadow-custom bg-[#1e84e481] rounded-[40px] py-[10px] px-[20px]">
          <p className="text-3xl flex flex-col gap-5">
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
