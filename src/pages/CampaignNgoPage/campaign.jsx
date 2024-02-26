import InputField from "../../Components/InputsFields/bigInputs";
import styles from "./campaign.module.css";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { campaign } from "../../Components/utils/Functions/authService";
function Campaign() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [campTitle, setCampTitle] = useState("");
  const [campDes, setcampDes] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [strtDate, setstrtDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [restriction, setRestriction] = useState("");
  const [lastDate, setlastDate] = useState("");

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <div className={styles.container}>
      {!showForm && (
        <div className="styles.container">
          <img src="./images/paw.png" alt="paw img" className={styles.paw3} />
          <h1 className={styles.heading1}>
            {" "}
            <p className={styles.slogan}>
              Protecting Paws,<br></br> Saving Lives
            </p>
          </h1>
          <button className={styles.createButton} onClick={toggleForm}>
            Create Campaign <FaPlus />
          </button>
          <img src="./images/paw.png" alt="paw img" className={styles.paw4} />
        </div>
      )}
      {showForm && (
        <div className={styles.container}>
          <h1 className={styles.heading}>Volunteer Now: Make Your Mark!</h1>
          <img src="./images/paw.png" alt="paw img" className={styles.paw1} />
          {/* <label>Name:</label> */}

          {/* DESCRIPTION FIELDSET */}

          <fieldset className={styles.fldset}>
            <legend>Decsription</legend>
            {/* CAMPAIGN TITLE */}
            <InputField
              type="textarea"
              placeholder="Campaign Title"
              value={campTitle}
              onChange={(e) => {
                setCampTitle(e.target.value);
              }}
              required
            />
            {/* CAMPAIGN DESCRIPTION */}
            <InputField
              type="textarea"
              placeholder="Campaign Description"
              value={campDes}
              onChange={(e) => {
                setcampDes(e.target.value);
              }}
              required
            />
            {/* ROLE */}
            <InputField
              type="text"
              placeholder="Role of Volunteer"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
              required
            />
          </fieldset>
          {/* CONTACT DETAILS FIELDSET */}
          <fieldset className={styles.fldset}>
            <legend>Contact Details</legend>
            <InputField
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
            {/* START DATE */}
            <div className={styles.dates}>
              <label className={styles.labl}>Start Date:</label>
              <InputField
                type="date"
                placeholder="Start Date"
                value={strtDate}
                onChange={(e) => {
                  setstrtDate(e.target.value);
                }}
                required
              />
            </div>
            {/* END DATES */}
            <div className={styles.dates}>
              <label className={styles.labl}>End Date:</label>
              <InputField
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => {
                  // setError("");
                  setendDate(e.target.value);
                }}
                required
              />
            </div>
            {/* APPLICATION DEADLINE */}
            <div className={styles.dates}>
              <label className={styles.labl}>Application Deadline:</label>
              <InputField
                type="date"
                placeholder="Deadline"
                value={lastDate}
                onChange={(e) => {
                  // setError("");
                  setlastDate(e.target.value);
                }}
                required
              />
            </div>
            {/* RESTRICTION */}
            <label className={styles.labl}> Age Group:</label>
            <div className={styles.radioContainer}>
              {/* THIRTEEN PLUS */}
              <div className={styles.radioInput}>
                <input
                  type="radio"
                  id="thirteen"
                  name="age"
                  value="Thirteen Plus"
                />
                <label htmlFor="thirteen">
                  <img
                    className={styles.radioImage}
                    src="./images/13.png"
                    alt=""
                  />
                </label>
              </div>
              {/* EIGHTEEN PLUS */}
              <div className={styles.radioInput}>
                <input
                  type="radio"
                  id="eighteen"
                  name="age"
                  value="Eighteen Plus"
                />
                <label htmlFor="eighteen">
                  <img
                    className={styles.radioImage}
                    src="./images/18+.png"
                    alt=""
                  />
                </label>
              </div>
              {/* ALL AGE GROUPS */}
              <div className={styles.radioInput}>
                <input type="radio" id="all" name="age" value="Everybody" />
                <label htmlFor="all">
                  <img
                    className={styles.radioImage}
                    src="./images/all.png"
                    alt=""
                  />
                </label>
              </div>
            </div>
            {/* DURATION OF VOLUNTEER OR INTERSHIP */}
            {/* <InputField
          type="number"
          placeholder="Enter Duration"
          value={duration}
          onChange={(e) => {
            // setError("");
            setDuration(e.target.value);
          }}
          required
        /> */}
          </fieldset>
          <fieldset className={styles.fldset}>
            {/* IMAGE INPUT */}
            <legend>Upload Images</legend>
            <InputField
              type="file"
              // value={role}
              // onChange={(e) => {

              //   setRole(e.target.value);
              // }}
              required
            />
          </fieldset>
          <img src="./images/paw.png" alt="paw img" className={styles.paw2} />
          {error && <p className={styles.errtext}>{error}</p>}
          <button
            className={styles.create}
            onClick={async () => {
              campaign(phoneNumber, email, setError);
            }}
            // onClick={toggleForm}HANDLE THE "ONCLICK" OF THIS BUTTTON
          >
            Create
            <FaPlus fontSize="18px" />
          </button>
        </div>
      )}
    </div>
  );
}
export default Campaign;
