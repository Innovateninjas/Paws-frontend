/**
 * Uploads an image file to Cloudinary.
 * @async
 * @param {File} imageFile - The image file to upload.
 * @returns {Promise<string>} A promise that resolves with the URL of the uploaded image on Cloudinary.
 * @throws {Error} If the upload fails or an error occurs during the process.
 */
export const uploadImageToCloudinary = async (imageFile) => {
    const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/dff97ky68/upload";
    const uploadPreset = "mnxkqfco";

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
        throw error; // Propagate the error
    }
};
