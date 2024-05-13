import React, { useState,useContext,useEffect} from "react";
import "cropperjs/dist/cropper.css";
import InputField from "../../../../Components/shared/InputField";
import { NgoContext } from "../../../../utils/contexts/NgoContext";
import { FaPlus } from "react-icons/fa";
import Creatable from 'react-select/creatable';
import { rolesOptions } from './Roles';
import ImageCropper from "../../../../Components/ngo/Cropper";
import createCampaign from "../createCampaign";
import disableDate  from "./dateDisable"
import Background from "../../../../Components/shared/Background";
import Button from "../../../../Components/shared/Button";
const CampaignForm = ({ setShowForm }) => {
    const { NgoData, loading, error } = useContext(NgoContext);
    const [orgName,setOrgName] = useState("Ngo"); // i will add option later for fetching the org name  from Ngocontext
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [campTitle, setCampTitle] = useState("");
    const [campDes, setcampDes] = useState("");
    const [tags, setTags] = useState("");
    const [campaignError, setError] = useState("");
    const [strtDate, setstrtDate] = useState("");
    const [endDate, setendDate] = useState("");
    const [ageGroup, setageGroup] = useState("");
    const [lastDate, setlastDate] = useState("");
    const [headerImgUrl, setheaderImgUrl] = useState("");
    let minDate = disableDate();
    useEffect(() => {
        if (!loading && !error && NgoData) {
            // Do something with NgoData after the promise is fulfilled
            setOrgName(NgoData.name)
        }
    }, [NgoData, loading, error]);
    return (
        <>
        <Background/>
        <div className="text-[#0B0553DE] min-h-screen py-12 overflow-x-hidden mx-auto flex flex-col gap-[30px] items-center mb-[120px]">
        
            <fieldset className="bg-white p-6 gap-[20px] rounded-[30px] bg-opacity-30 backdrop-blur-[5px] shadow-dashBoardCardImageShadow flex flex-col" >
               <label className="text-[1.6rem] font-extrabold underline tracking-wider uppercase text-center">Description</label>
                <InputField
                className="placeholder-stone h-16 bg-opacity-45 backdrop-blur-[6px] w-[300px] px-4 items-center outline-0 rounded-[30px] text-black text-lg bg-white bg-opacity-47 shadow-dashBoardCardImageShadow"
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
                className="placeholder-stone h-20 bg-opacity-45 backdrop-blur-[6px] w-[300px]  px-4 leading-[80px]  outline-0 rounded-[40px] text-lg  bg-white bg-opacity-47 shadow-dashBoardCardImageShadow"
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
                control: base => ({
            ...base,
            // maxHeight: "6rem",
            width: '300px',
            // backgroundImage: "linear-gradient(to bottom, rgba(252, 178, 231, 0.68), rgba(252, 174, 242, 0.68),rgba(242, 117, 237,0.68))",
            backgroundColor: "#ffffff80",
            boxShadow: "3.847223997116089px 4.946430683135986px 14.289689064025879px 0px #00000040",
            borderRadius: '30px',
            padding: '0.5rem 1rem',
            fontSize: '16px',
            backdropFilter: 'blur(6px)',
            outline: '0',
            overflow: 'scroll',
            position: 'relative',
        }),
        menu: (provided) => ({
            ...provided,
            position:'relative'
        }),
        multiValue: (provided, state) => ({
            ...provided,
            backgroundColor: '#fafafae6',
            borderRadius: '30px',
            fontSize: '18px',
            marginLeft: '5px',
            padding: '2px',
        }),
        clearIndicator: (provided, state) => ({
            ...provided,
            color: 'rgb(244 63 94)',
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: 'black',
            lineHeight: '32px',
        }),
    }}
    isMulti={true}
    placeholder="Enter tags"
    options={rolesOptions}
    onClick={() => {}}
    onChange={(selectedOptions) => {
        const tags = selectedOptions.map(option => option.label);
        setError("");
        setTags(tags);
    }}
/>
            </fieldset>
            <fieldset className="bg-white p-6 gap-[20px] rounded-[30px] bg-opacity-30 backdrop-blur-[5px] shadow-dashBoardCardImageShadow flex flex-col">
            <label className="text-[1.6rem] uppercase font-extrabold underline tracking-wider text-center">Contact details</label>
                <InputField
                className="h-16 bg-opacity-45 backdrop-blur-[6px] w-[300px] px-4 leading-[px] items-center outline-0 rounded-[30px] text-lg placeholder-stone bg-white bg-opacity-47 shadow-dashBoardCardImageShadow"
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
                className="h-16 bg-opacity-45 backdrop-blur-[6px] w-[300px] px-4 leading-[px] items-center outline-0 rounded-[30px] text-lg placeholder-stone bg-white bg-opacity-47 shadow-dashBoardCardImageShadow "
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
            <fieldset className="bg-white p-6 gap-[20px] rounded-[30px] bg-opacity-30 backdrop-blur-[5px] shadow-dashBoardCardImageShadow flex flex-col">
                <label className="text-[1.6rem] uppercase font-extrabold underline tracking-wider text-center">Duration</label>
                <div className="flex flex-col gap-[4px]">
                    <label className="text-[1.2rem] font-bold">Start Date:</label>
                    <InputField
                        className="text-stone h-16 bg-opacity-45 backdrop-blur-[6px] w-[300px] px-4 leading-[px] items-center outline-0 rounded-[30px] text-lg placeholder-stone bg-white bg-opacity-47 shadow-dashBoardCardImageShadow"
                        type="date"
                        value={strtDate}
                        min= {minDate}
                        onChange={(e) => {
                            setError("");
                            setstrtDate(e.target.value);
                        }}
                        required
                    />
                    
                </div>
                <div className="flex flex-col gap-[4px]">
                    <label className="text-[1.2rem] font-bold">End Date:</label>
                    <InputField
                        className="text-stone h-16 bg-opacity-45 backdrop-blur-[6px] w-[300px] px-4 leading-[px] items-center outline-0 rounded-[30px] text-lg placeholder-stone bg-white bg-opacity-47 shadow-dashBoardCardImageShadow"
                        type="date"
                        value={endDate}
                        min= {minDate}
                        onChange={(e) => {
                            setError("");
                            setendDate(e.target.value);
                        }}
                        required
                    />
                </div>
                <div className="flex flex-col gap-[4px]">
                    <label className="text-[1.2rem] font-bold">Application Deadline:</label>
                    <InputField
                        className="text-stone h-16 bg-opacity-45 backdrop-blur-[6px] w-[300px] px-4 leading-[px] items-center outline-0 rounded-[30px] text-lg placeholder-stone bg-white bg-opacity-47 shadow-dashBoardCardImageShadow"
                        type="date"
                        value={lastDate}
                        min= {minDate}
                        onChange={(e) => {
                            setError("");
                            setlastDate(e.target.value);
                        }}
                        required
                    />
                </div>
                <div className="flex flex-col gap-[6px]">
                <label className="text-[1.2rem]  font-bold"> Age Group:</label>
                <div className="bg-opacity-45 backdrop-blur-[6px] w-[300px] px-4 p-3 leading-[px] items-center outline-0 rounded-[40px] text-lg placeholder-stone bg-white bg-opacity-47 shadow-dashBoardCardImageShadow border-1 flex justify-evenly overflowX-scroll">
                    <div className="flex  justify-center flex-col gap-[5px] items-center">
                    <label className="text-[1.2rem] text-black font-semibold" htmlFor="thirteen">
                            13
                        </label>
                        <input
                            className="w-7 h-7"
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
                        
                    </div>
                    <div className="flex justify-center flex-col gap-[5px] items-center">
                       
                       <label className="text-[1.2rem] text-black font-semibold" htmlFor="eighteen">
                            18+
                        </label>
                        <input className="w-7 h-7"
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
                    </div>
                    <div className="flex flex-col justify-center gap-[5px] items-center">
                        <label className="text-[1.2rem] text-black font-semibold" htmlFor="all">
                             All Age
                        </label>
                        <input type="radio"
                            className="w-7 h-7"
                            id="all"
                            name="age"
                            value="Everybody"
                            checked={ageGroup === 1} // Added checked attribute
                            onChange={() => {
                                setError("");
                                setageGroup(1);
                            }}
                        />
                        
                    </div>
                </div>
            </div>
            </fieldset>
            <ImageCropper
                headerImgUrl={headerImgUrl}
                setheaderImgUrl={setheaderImgUrl}
            />
            {/* {console.log("Error:",!error)} */}
            {!error && <p className="text-red-600 tracking-wider drop-shadow-lg font-semibold text-base">{campaignError}</p>}
            <Button
                clas=" py-5 px-8 font-semibold tracking-wider text-[1.5rem] leading-[1.5rem]"
                onClick={async () => {
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
                         setError,
                         setShowForm
                         );
                }}
                text={<> <span className="flex gap-2 items-center"> Create <FaPlus fontSize="18px" /></span> </>}
            />
        </div>
        </>
    );
};

export default CampaignForm;
