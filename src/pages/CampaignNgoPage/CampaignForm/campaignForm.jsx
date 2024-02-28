import React, { useState} from "react";
import "cropperjs/dist/cropper.css";
import InputField from "../../../Components/InputsFields/bigInputs";
import styles from "./campaign.module.css";
import { FaPlus } from "react-icons/fa";
import Creatable from 'react-select/creatable';
import { rolesOptions } from './Roles';
import ImageCropper from "../../../Components/ImageCropper/Cropper";
import createCampaign from "../createCampaign";

const CampaignForm = ({ setShowForm }) => {
    const [orgName,setOrgName] = useState("laxmi cheat fund"); // i will add option later for fetching the org name  from Ngocontext
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [campTitle, setCampTitle] = useState("");
    const [campDes, setcampDes] = useState("");
    const [tags, setTags] = useState("");
    const [error, setError] = useState("");
    const [strtDate, setstrtDate] = useState("");
    const [endDate, setendDate] = useState("");
    const [ageGroup, setageGroup] = useState(0);
    const [lastDate, setlastDate] = useState("");
    const [headerImgUrl, setheaderImgUrl] = useState("");



        

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Volunteer Now: Make Your Mark!</h1>
            <img src="./images/paw.png" alt="paw img" className={styles.paw1} />

            <fieldset className={styles.fldset}>
                <legend>Decsription</legend>
                <InputField
                    margin="10px"
                    boxShadow="1px 1px 2px black"
                    type="text"
                    placeholder="Campaign Title"
                    value={campTitle}
                    onChange={(e) => {
                        setError("");
                        setCampTitle(e.target.value);
                    }}
                    required
                />
                <InputField
                    boxShadow="1px 1px 2px black"
                    margin="10px"
                    type="textarea"
                    placeholder="Campaign Description"
                    value={campDes}
                    onChange={(e) => {
                        setError("");
                        setcampDes(e.target.value);
                    }}
                    required
                />
                <Creatable
                    styles={{
                        control: base =>
                        ({
                            ...base,
                            width: '300px',
                            boxShadow: "1px 1px 2px black",
                            border: '1px solid #b6b5b5',
                            height: '46px',
                            borderRadius: '10px',
                            padding: '10px 17px',
                            marginTop: '0.675rem',
                            fontSize: '16px',
                            marginLeft: '10px',
                            // fontWeight: '700'
                        })
                    }
                    }
                    isMulti={true}
                    placeholder="enter tags"
                    options={rolesOptions}
                    onChange={(selectedOptions) => {
                        const tags = selectedOptions.map(option => option.label);
                        setError("");
                        setTags(tags);
                    }
                    }
                />
            </fieldset>
            <fieldset className={styles.fldset}>
                <legend>Contact Details</legend>
                <InputField
                    margin="10px"
                    boxShadow="1px 1px 2px black"
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => {
                        setError("");
                        setPhoneNumber(e.target.value);
                    }}
                    required
                />
                <InputField
                    margin="10px"
                    boxShadow="1px 1px 2px black"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setError("");
                        setEmail(e.target.value);
                    }}
                    required
                />
            </fieldset>

            <fieldset className={styles.fldset}>
                <legend>Duration</legend>
                <div className={styles.dates}>
                    <label className={styles.labl}>Start Date:</label>
                    <InputField
                        margin="10px"
                        boxShadow="1px 1px 2px black"
                        type="date"
                        placeholder="Start Date"
                        value={strtDate}
                        onChange={(e) => {
                            setError("");
                            setstrtDate(e.target.value);
                        }}
                        required
                    />
                </div>
                <div className={styles.dates}>
                    <label className={styles.labl}>End Date:</label>
                    <InputField
                        margin="10px"
                        boxShadow="1px 1px 2px black"
                        type="date"
                        placeholder="End Date"
                        value={endDate}
                        onChange={(e) => {
                            setError("");
                            setendDate(e.target.value);
                        }}
                        required
                    />
                </div>
                <div className={styles.dates}>
                    <label className={styles.labl}>Application Deadline:</label>
                    <InputField
                        margin="10px"
                        boxShadow="1px 1px 2px black"
                        type="date"
                        placeholder="Deadline"
                        value={lastDate}
                        onChange={(e) => {
                            setError("");
                            setlastDate(e.target.value);
                        }}
                        required
                    />
                </div>
                <label className={styles.labl}> Age Group:</label>
                <div className={styles.radioContainer}>
                    <div className={styles.radioInput}>
                        <input
                            className="radios"
                            type="radio"
                            id="thirteen"
                            name="age"
                            value="Thirteen Plus"
                            checked={ageGroup === 13} // Added checked attribute
                            onChange={() => {
                                setError("");
                                setageGroup(13);
                            }}
                        />
                        <label htmlFor="thirteen">
                            <img
                                className={styles.radioImage}
                                src="./images/13.png"
                                alt=""
                            />
                        </label>
                    </div>
                    <div className={styles.radioInput}>
                        <input className="radios"
                            type="radio"
                            id="eighteen"
                            name="age"
                            value="Eighteen Plus"
                            checked={ageGroup === 18} // Added checked attribute
                            onChange={() => {
                                setError("");
                                setageGroup(18);
                            }}
                        />
                        <label htmlFor="eighteen">
                            <img
                                className={styles.radioImage}
                                src="./images/18+.png"
                                alt=""
                            />
                        </label>
                    </div>
                    <div className={styles.radioInput}>
                        <input type="radio"
                            className="radios"
                            id="all"
                            name="age"
                            value="Everybody"
                            checked={ageGroup === 0} // Added checked attribute
                            onChange={() => {
                                setError("");
                                setageGroup(0);
                            }}
                        />
                        <label htmlFor="all">
                            <img className={styles.radioImage} src="./images/all.png" alt="" />
                        </label>
                    </div>
                </div>





            </fieldset>
            <ImageCropper
                headerImgUrl={headerImgUrl}
                setheaderImgUrl={setheaderImgUrl}
            />



            <img src="./images/paw.png" alt="paw img" className={styles.paw2} />
            {error && <p className={styles.errtext}>{error}</p>}
            <button
                className={styles.create}
                onClick={async () => {
                    console.log(
                        orgName,
                        phoneNumber,
                        email,
                        campTitle,
                        campDes,
                        tags,
                        strtDate,
                        endDate,
                        ageGroup,
                        lastDate,
                        headerImgUrl
                    );
                    createCampaign(orgName,
                        phoneNumber, 
                        email,
                        campTitle,
                        campDes,
                        tags,
                        strtDate,
                        endDate,
                        ageGroup,
                        lastDate,
                        headerImgUrl,
                         setError
                         );
                    setShowForm(true); // This line will hide the form after submission
                }}
            >
                Create <FaPlus fontSize="18px" />
            </button>
        </div>
    );
};

export default CampaignForm;
