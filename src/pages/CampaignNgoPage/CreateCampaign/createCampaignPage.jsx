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
            {/* Remove one onClick prop */}
            <MButton text="Create Campaign"  onClick={onClick} />
            <img src="./images/paw.png" alt="paw img" className={styles.paw4} />
        </div>
    );
};

export default CreateCampaignPage;
