import { uploadImageToCloudinary } from "../../../Components/utils/Functions/imageUploader";

/**
 * Handles the change of an image, uploads it to Cloudinary, and updates the state accordingly.
 * @async
 * @param {Array} imageList - An array containing the selected image file.
 * @param {Function} setImage - A function to update the state with the uploaded image URL.
 * @param {Function} handleChange - A function to handle changes in the form data.
 * @returns {Promise<void>} A promise that resolves when the image upload and state update are complete.
 */
export const handleImageChange = async (imageList, setImage, handleChange) => {
    try {
        const imageUrl = await uploadImageToCloudinary(imageList[0].file);
        setImage(imageUrl);
        handleChange({
            target: {
                name: "image",
                value: imageUrl
            }
        });
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};
