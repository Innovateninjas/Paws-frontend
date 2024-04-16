import axios from "axios";

export const ngoValidator = async (darpanid, setError) => {
    try {
        const url = process.env.REACT_APP_BACKEND_URL;
        const formData = new FormData();
        formData.append('id', darpanid);

        const response = await axios.post(`${url}/check_ngo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log(response.data["ngo_exists"]);
        return response.data["ngo_exists"];
    } catch (error) {
        if (error.response) {
            setError(error.response.data.error);
        } else if (error.request) {
            setError("No response received from the server.");
        } else {
            setError("An unexpected error occurred.");
        }
        throw error; // Rethrow the error to be caught by the caller
    }
};
