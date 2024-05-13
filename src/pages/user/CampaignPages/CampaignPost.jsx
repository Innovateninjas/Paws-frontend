import React, { useState, useEffect, useContext } from "react";
import Skeleton from "../../../Components/user/SkeletonLoaders/CampaignPost";
import { useParams } from "react-router-dom";
import axios from "axios";
import Background from "../../../Components/shared/Background";
import Button from "../../../Components/shared/Button";
import { handleInterest } from "../../../utils/Functions/handleInterest";
import { UserContext } from "../../../utils/contexts/UserContext";
const CampaignBlog = () => {
  // const [id, setId] = useState();
  const { userData, loading, error } = useContext(UserContext);
  const [userDetails, setUserData] = useState(null);
  const { campaignId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [age, setAge] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [appEndDate, setAppEndDate] = useState();
  const [interested, setInterested] = useState("Show Interest");
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (!loading && !error && userData) {
      setUserData(userData);
    }
  }, [userData, loading, error]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userDetails) {
          // console.log(userData.email);
          const url = process.env.REACT_APP_BACKEND_URL;
          const response = await axios.get(
            `${url}/api/campaigns/${campaignId}`
          );

          const dataJson = response.data;
          // console.log(dataJson);
          // Convert start date format
          let startDate = new Date(dataJson.start_date);
          let formattedStartDate = startDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          // Convert end date format
          let endDate = new Date(dataJson.end_date);
          let formattedEndDate = endDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          // Convert application end date format
          let appEndDate = new Date(dataJson.application_deadline);
          let formattedAppEndDate = appEndDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          // Update state variables
          setStartDate(formattedStartDate);
          setEndDate(formattedEndDate);
          setAppEndDate(formattedAppEndDate);
          
          setIsLoading(false);
          setData(dataJson);
          setAge(dataJson.age_group);

          // DISABLING BUTTON IF USER HAS ALREADY SHOWN INTEREST
          if (dataJson.applicant_list.includes(userDetails.email)) {
            setInterested("Interested");
            setDisable(true);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [campaignId,userDetails]);

  const ageAccess = () => {
    if (age === 0) {
      return "Open to All Age Groups";
    } else {
      return age + "+";
    }
  };
  return (
    <div>
      <>
        {!isLoading && (
          <>
            <Background />
            <div className="font-breeSerif">
            {/* bg-gradient-to-br from-[rgba(189,255,185,0.87)] to-[rgb(0,238,8)] via-[rgba(155,255,160,0.93)]  */}
            <h1 className="text-center font-breeSerif text-[#40025D] leading-relaxed p-2 text-[30px] rounded-[30px] font-bold w-[90%] mx-auto mt-[30px] mb-5">
                {data.title}
              </h1>
              <small className="text-[#000000] pb-[15px] tracking-wider font-bold float-right mr-4 text-sm">
                  Organised By- <u> {data.ngo_name}</u>
              </small>
              <br />
              <div className=" py-[8px] h-fit px-[20px] w-[95vw] flex flex-col gap-4 rounded-3xl shadow-dashBoardCardImageShadow bg-[#ffffff66] mb-[120px] backdrop-blur-[5px] m-auto">
                <h2 className="pt-[2px] text-[#0B0553] text-2xl drop-shadow-xl ">
                  <i>Description:</i>
                </h2>
                  {data.description}
                  {/* LIST CONTAINER */}
                  <div className="flex mt-[5px] w-full flex-col gap-[5px]">
                    <li className="list-none">
                      <b> Campaign starts on: </b>
                      {startDate}
                    </li>
                    <li className="list-none">
                      <b> Campaign ends on: </b>
                      {endDate}
                    </li>
                    <li className="list-none">
                      <b>Application Deadline: </b>
                      {appEndDate}
                    </li>   
                    <li className="list-none">
                      <b className="mr-[5px]"> Age Accessibility:</b>
                      {ageAccess()}
                    </li>
                  </div>
                  <p className="p-[5px]">
                    For inquiries, contact us on:
                    <li>{data.phone_number}</li>
                    <li>{data.email}</li>
                  </p>

                  <img
                    className="w-full rounded-[20px] object-center mt-[10px] shadow-dashBoardCardImageShadow"
                    src={data.image_link}
                    alt=""
                  />
                  <p className="font-normal w-full text-base flex flex-wrap gap-[5px]">
                    {data.tags &&
                      data.tags.map((item, index) => (
                        <span
                          className="bg-gradient-to-b from-gray-200 to-gray-400 px-5 shadow-buttonShadow py-2 rounded-[20px]"
                          key={index}
                        >
                          {item} <br></br>
                        </span>
                      ))}
                  </p>
                  <div className="mt-4 w-full flex flex-wrap justify-evenly gap-4">            
                  <Button
                    text={interested}
                    clas={`text-2xl text-white font-normal focus:outline-none rounded-[30px] tracking-wider shadow-buttonShadow mb-7 ${disable ? "bg-gradient-to-b from-gray-500 to-gray-700" : ""
                      }`}
                    onClick={() =>
                      handleInterest(
                        campaignId,
                        userDetails.email,
                        setInterested,
                        setDisable
                      )
                    }
                    disabled={disable}
                  />                  
                  </div>
              </div>
            </div>
          </>
        )}
        {isLoading && (
          <>
          <Background />
          <div>
            <Skeleton/>
          </div></>
          
        )}
      </>
    </div>
  );
};

export default CampaignBlog;
