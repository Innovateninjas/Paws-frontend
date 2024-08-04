import axios from "axios";

export const handleInterest = async (id, email, setInterested,setDisable) => {
  try {
    const url = process.env.REACT_APP_BACKEND_URL;
    const response = await axios.get(
      `${url}/api/campaigns/${id}/`
    );
    let applicant_list = response.data.applicant_list;
    if (applicant_list === null) {
      applicant_list = "";
      applicant_list = applicant_list.concat(email);
    }
    else{
        applicant_list = applicant_list.concat(",", email);
    }
    
    
    // console.log(applicant_list);
    const patchResponse = await axios.patch(
      `https://paws-backend.azurewebsites.net/api/campaigns/${id}/`,
      {
        applicant_list: applicant_list,
      }
    );
    if (patchResponse.status === 200) {
      setInterested("Interested");
      setDisable(true);
    } else {
      console.error("Error showing interest:", patchResponse.statusText);
    }
  } catch (error) {
    console.error("Error showing interest:", error.message);
  }
};
