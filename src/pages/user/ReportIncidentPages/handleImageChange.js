import { uploadImageToCloudinary } from "../../../utils/Functions/imageUploader";

/**
 * Function to handle image change, upload it to Cloudinary, and detect animal type and injury using Azure Custom Vision API.
 * @param {array} imageList - List of images to handle.
 * @param {function} handleChange - Function to handle change.
 * @param {function} setAnimalType - Function to set the detected animal type.
 * @param {function} setErrors - Function to set errors.
 * @param {function} setFormData - Function to set form data.
 */
export const handleImageChange = async (imageList, handleChange ,setErrors, setFormData) => {
    try {
        const imageUrl = await uploadImageToCloudinary(imageList[0].file, setErrors);
        console.log(imageUrl);
        handleChange({
            target: {
                name: "image",
                value: imageUrl
            }
        });
        
        let animalType = null;
        let numberOfAnimals = 0;
        let injuryTypes = [];

        // Detect animal type using Azure Custom Vision API
        const predictionUrlAnimal = process.env.REACT_APP_PREDICTION_URL_ANIMAL;
        const predictionKeyAnimal = process.env.REACT_APP_PREDICTION_KEY_ANIMAL;

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
                topAnimalPredictions.forEach(prediction => {
                    if (prediction.probability > 0.5) {
                        numberOfAnimals++;
                        if (!animalType) {
                            animalType = prediction.tagName;
                            handleChange({
                                target: {
                                    name: "predictedAnimal",
                                    value: animalType
                                }
                            });
                        }
                    }
                });
            }
        }

        // Detect injury using Azure Custom Vision API
        const predictionUrlInjury = process.env.REACT_APP_PREDICTION_URL_INJURY;
        const predictionKeyInjury = process.env.REACT_APP_PREDICTION_KEY_INJURY;

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
                injuryTypes = topInjuryPredictions.filter(prediction => prediction.probability > 0.5).map(prediction => prediction.tagName);
            }
        }
        let animalsString;
        if (numberOfAnimals === 1) {
            animalsString = "one";
        } else if (numberOfAnimals === 2) {
            animalsString = "two";
        } else if (numberOfAnimals >= 3) {
            animalsString = "more";
        }
        else {
            animalsString = "";
        }
        handleChange({
            target: {
                name: "numberOfAnimals",
                value: animalsString
            }
        });
        handleChange({
            target: {
                name: "description",
                value: injuryTypes[0]
            }
        });
        handleChange({
            target: {
                name: "image",
                value: imageUrl
            }
        });

        // Update form data after all data is fetched
        setFormData(prevData => ({
            ...prevData,
            image: imageUrl,
            predictedAnimal: animalType,
            predictedNumberOfAnimals:animalsString,
            predictedDescription: injuryTypes[0],
        }));
      
    } catch (error) {
        console.error('Error handling image change:', error);
    }
};

