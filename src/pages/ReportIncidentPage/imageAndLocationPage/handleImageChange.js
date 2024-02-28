import { uploadImageToCloudinary } from "../../../Components/utils/Functions/imageUploader";

/**
 * Function to handle image change, upload it to Cloudinary, and detect animal type using Azure Custom Vision API.
 * @param {array} imageList - List of images to handle.
 * @param {function} setImage - Function to set the image.
 * @param {function} handleChange - Function to handle change.
 * @param {function} setAnimalType - Function to set the detected animal type.
 */
export const handleImageChange = async (imageList, setImage, handleChange, setAnimalType) => {
    try {
        const imageUrl = await uploadImageToCloudinary(imageList[0].file);
        setImage(imageUrl);
        
        // Detect animal type using Azure Custom Vision API
        const predictionUrl = "https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/9fcd78e5-6ce4-41ba-9bec-c214ee23708d/detect/iterations/Iteration6/url";
        const predictionKey = "d341019dfb574879acbf12ee6c4791cc";
  
        const response = await fetch(predictionUrl, {
            method: "POST",
            headers: {
                "Prediction-Key": predictionKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Url: imageUrl }),
        });
  
        if (response.ok) {
            const data = await response.json();
            if (data.predictions && data.predictions.length > 0) {
                const topPrediction = data.predictions[8];
                const animalType = topPrediction.tagName;
                setAnimalType(animalType);
                console.log(animalType)
            } else {
                throw new Error("No predictions found.");
            }
        } else {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        handleChange({
            target: {
                name: "image",
                value: imageUrl
            }
        });
    } catch (error) {
        console.error('Error handling image change:', error);
    }
};
