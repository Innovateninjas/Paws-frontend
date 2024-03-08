import { uploadImageToCloudinary } from "../../../Components/utils/Functions/imageUploader";

/**
 * Function to handle image change, upload it to Cloudinary, and detect animal type and injury using Azure Custom Vision API.
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
        const predictionUrlAnimal = "https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/9fcd78e5-6ce4-41ba-9bec-c214ee23708d/detect/iterations/Iteration7/url";
        const predictionKeyAnimal = "d341019dfb574879acbf12ee6c4791cc";

        const animalResponse = await fetch(predictionUrlAnimal, {
            method: "POST",
            headers: {
                "Prediction-Key": predictionKeyAnimal,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Url: imageUrl }),
        });

        if (animalResponse.ok) {
            const animalData = await animalResponse.json();
            if (animalData.predictions && animalData.predictions.length > 0) {
                const topAnimalPredictions = animalData.predictions.sort((a, b) => b.probability - a.probability).slice(0, 4); // Sort predictions by probability and take the top 4
                let numberOfAnimals = 0;
                topAnimalPredictions.forEach(prediction => {
                    if (prediction.probability > 0.5) {
                        numberOfAnimals++;
                        console.log("Animal Type with Probability over 80%:", prediction.tagName);
                    }
                });
                if (numberOfAnimals > 0) {
                    handleChange({
                        target: {
                            name: "predictedAnimal",
                            value: topAnimalPredictions[0].tagName // Set the predicted animal to the most probable one
                        }
                    });
                    setFormData((prevData) => ({
                        ...prevData,
                        predictedAnimal: topAnimalPredictions[0].tagName,
                    }));
                    console.log("Total Number of Animals:", numberOfAnimals);
                } else {
                    console.log("No animals detected with probability over 50%.");
                }
            } else {
                console.log("No animal predictions found.");
            }
        } else {
            throw new Error(`Error detecting animal type: ${animalResponse.status} - ${animalResponse.statusText}`);
        }

        // Detect injury using Azure Custom Vision API
        const predictionUrlInjury = "https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/57c89ddd-318e-4d12-a1b3-f04a4e5c1647/classify/iterations/Iteration3/url";
        const predictionKeyInjury = "d341019dfb574879acbf12ee6c4791cc";

        const injuryResponse = await fetch(predictionUrlInjury, {
            method: "POST",
            headers: {
                "Prediction-Key": predictionKeyInjury,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Url: imageUrl }),
        });

        if (injuryResponse.ok) {
            const injuryData = await injuryResponse.json();
            if (injuryData.predictions && injuryData.predictions.length > 0) {
                const topInjuryPredictions = injuryData.predictions.sort((a, b) => b.probability - a.probability).slice(0, 4); // Sort predictions by probability and take the top 4
                let numberOfInjuries = 0;
                topInjuryPredictions.forEach(prediction => {
                    if (prediction.probability > 0.5) {
                        numberOfInjuries++;
                        console.log("Injury Type with Probability over 50%:", prediction.tagName);
                    }
                });
                if (numberOfInjuries > 0) {
                    console.log("Total Number of Injuries:", numberOfInjuries);
                } else {
                    console.log("No injuries detected with probability over 50%.");
                }
            } else {
                console.log("No injury predictions found.");
            }
        } else {
            throw new Error(`Error detecting injury: ${injuryResponse.status} - ${injuryResponse.statusText}`);
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
