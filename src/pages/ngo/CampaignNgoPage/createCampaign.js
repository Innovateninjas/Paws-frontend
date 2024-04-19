import isValidEmail from "../../../utils/Functions/emailValidator";
import isValidPhoneNumber from "../../../utils/Functions/phoneNumberValidator";
import axios from "axios";

const createCampaign = async ( orgName,phoneNumber,email,campaignTitle,CampaignDescription,tags,startDate,endDate,ageGroup,lastDate,headerImgUrl,setError,setShowForm) => {
    console.log("from create camp",
    orgName,
    phoneNumber,
    email,
    campaignTitle,
    CampaignDescription,
    tags,
    startDate,
    )
    if (!orgName) {
        console.log("i am inside orgName")
        setError("Erorr Fetching Organization Name,Plese Login first");
        return;
    }
    
    if (!isValidPhoneNumber(phoneNumber)) {
        console.log("i am inside phoneNumber")
        setError("Enter a Valid phone Number");
        return;
    }
    if (!isValidEmail(email)) {
        console.log("i am inside email")
        setError("Enter a Valid Email Address");
        return;
    }
    if (!campaignTitle) {
        console.log("i am inside campaignTitle")
        setError("Campaign Title is required");
        return;
    }
    if (!CampaignDescription) {
        console.log("i am inside CampaignDescription")
        setError("Campaign Description is required");
        return;
    }
    if (!tags) {
        console.log("i am inside tags")
        setError("Tags are required");
        return;
    }
    if (!startDate) {
        console.log("i am inside startDate")
        setError("Start Date is required");
        return;
    }
    if (!endDate) {
        console.log("i am inside endDate")
        setError("End Date is required");
        return;
    }
    if (!ageGroup) {
        console.log("i am inside ageGroup")
        setError("Age Group is required");
        return;
    }
    if (!lastDate) {
        console.log("i am inside lastDate")
        setError("Last Date is required");
        return;
    }
    if(headerImgUrl==="wait"){
        setError("Please wait for the image to upload");
        setTimeout(() => {
            setError("");
        }, 2000);

        return;
    }
    const ngo_name = orgName;
    const title = campaignTitle;
    const description = CampaignDescription;
    const phone_number = phoneNumber;
    const start_date = startDate;
    const end_date = endDate;
    const application_deadline = lastDate;
    const age_group = ageGroup;
    setError("");
    try {
        const url = process.env.REACT_APP_BACKEND_URL;
        console.log("i am here finally")
         await axios.post(
            `${url}/api/campaigns/`,
            {
                ngo_name,
                phone_number,
                email,
                title,
                description,
                tags,
                start_date,
                end_date,
                age_group,
                application_deadline,
                headerImgUrl
            }
        );
        setShowForm(false);
    } catch (error) {
        if (error.response && error.response.data.error) {
            setError(error.response.data.error);
        } else {
            setError("An error occurred while creating campaign.");
        }
    }
    
}

export default createCampaign;
