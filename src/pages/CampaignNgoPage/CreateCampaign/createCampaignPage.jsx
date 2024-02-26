// CreateButton.js
import React from "react";
import { FaPlus } from "react-icons/fa";
import styles from "./createCampaign.module.css";
import MButton from "../../../Components/buttons/MediumButton/mButton"; 
const CreateCampaignPage = ({ onClick }) => {
    return (
        <div className={styles.container}>
            <img src="./images/paw.png" alt="paw img" className={styles.paw3} />
            <h1 className={styles.heading1}>
                {" "}
                <p className={styles.slogan}>
                    Protecting Paws,<br></br> Saving Lives
                </p>
            </h1>
            <MButton text="Create Campaign" icon={FaPlus} onClick={onClick} />
            <img src="./images/paw.png" alt="paw img" className={styles.paw4} />
        </div>
    );
};

export default CreateCampaignPage;
