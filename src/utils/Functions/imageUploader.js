/**
 * Uploads an image file to Cloudinary.
 * @async
 * @param {File} imageFile - The image file to upload.
 * @returns {Promise<string>} A promise that resolves with the URL of the uploaded image on Cloudinary.
 * @throws {Error} If the upload fails or an error occurs during the process.
 */
export const uploadImageToCloudinary = async (imageFile, setErrors) => {
    const cloudinaryUploadUrl = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", uploadPreset);

    try {
        const response = await fetch(cloudinaryUploadUrl, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Failed to upload image to Cloudinary: ${response.statusText}`); 
           
        }

        const result = await response.json();
        return result.secure_url; // Assuming Cloudinary API returns an object with a 'secure_url' property
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        if(setErrors){
            setErrors((prevErrors) => ({
               ...prevErrors,
               imgUpLoading: "An error occurred while uploading the image.Check your internet connection",
           }));
           setTimeout(()=>{
               setErrors((prevErrors) => ({
                   ...prevErrors,
                   imgUpLoading: "",
               }));
           },5000);
        }
    }
};
