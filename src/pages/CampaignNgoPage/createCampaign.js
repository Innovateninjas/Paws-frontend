import isValidEmail from "../../Components/utils/Functions/emailValidator";
import isValidPhoneNumber from "../../Components/utils/Functions/phoneNumberValidator";
import axios from "axios";

const createCampaign =async (orgName,phoneNumber,email,campaignTitle,CampaignDescription,tags,startDate,endDate,ageGroup,lastDate,headerImgUrl,setError) => {
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

    setError("");
    try {
        console.log("i am here finally")
        const response = await axios.post(
            "https://aniresfr-backend.vercel.app/api/campaigns/",
            {
                orgName,
                phoneNumber,
                email,
                campaignTitle,
                CampaignDescription,
                tags,
                startDate,
                endDate,
                ageGroup,
                lastDate,
                headerImgUrl
            }
        );
        console.log(response);
    } catch (error) {
        if (error.response && error.response.data.error) {
            setError(error.response.data.error);
        } else {
            setError("An error occurred while creating campaign.");
        }
    }
    
}

export default createCampaign;
