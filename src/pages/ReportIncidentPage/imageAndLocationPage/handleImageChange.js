import { uploadImageToCloudinary } from "../../../Components/utils/Functions/imageUploader";

/**
 * Function to handle image change, upload it to Cloudinary, and detect animal type using Azure Custom Vision API.
 * @param {array} imageList - List of images to handle.
 * @param {function} handleChange - Function to handle change.
 * @param {function} setAnimalType - Function to set the detected animal type.
 * @param {function} setErrors - Function to set errors.
 * @param {function} setFormData - Function to set form data.
 */
export const handleImageChange = async (imageList, handleChange, setAnimalType, setErrors, setFormData) => {
    try {
        const imageUrl = await uploadImageToCloudinary(imageList[0].file, setErrors);
        setFormData((prevData) => ({
            ...prevData,
            image: imageUrl,
        }));

        // Detect animal type using Azure Custom Vision API
        const predictionUrl = "https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/9fcd78e5-6ce4-41ba-9bec-c214ee23708d/detect/iterations/Iteration7/url";
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
                const topPredictions = data.predictions.sort((a, b) => b.probability - a.probability).slice(0, 4); // Sort predictions by probability and take the top 4
                let numberOfAnimals = 0;
                topPredictions.forEach(prediction => {
                    if (prediction.probability > 0.5) {
                        numberOfAnimals++;
                        console.log("Animal Type with Probability over 80%:", prediction.tagName);
                    }
                });
                if (numberOfAnimals > 0) {
                    handleChange({
                        target: {
                            name: "predictedAnimal",
                            value: topPredictions[0].tagName // Set the predicted animal to the most probable one
                        }
                    });
                    setFormData((prevData) => ({
                        ...prevData,
                        predictedAnimal: topPredictions[0].tagName,
                    }));
                    console.log("Total Number of Animals:", numberOfAnimals);
                } else {
                    console.log("No animals detected with probability over 50%.");
                }
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
