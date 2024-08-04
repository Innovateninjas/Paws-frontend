import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Cropper from "react-cropper"; // https://www.npmjs.com/package/react-cropper
import "cropperjs/dist/cropper.css";
import { uploadImageToCloudinary } from "../../utils/Functions/imageUploader";

/**
 * ImageCropper component for uploading and cropping images.
 * @param {Object} props - The component props.
 * @param {string} props.headerImgUrl - The URL of the image to be cropped.
 * @param {Function} props.setheaderImgUrl - Function to set the URL of the cropped image.
 * @param {number} [props.aspectRatio=4 / 3] - The aspect ratio of the cropping area.
 * @returns {JSX.Element} ImageCropper component.
 */
const ImageCropper = ({ headerImgUrl, setheaderImgUrl, aspectRatio = 4 / 3 }) => {
    const [iscropdone, setcropdone] = useState(true);
    const cropperRef = useRef();

    /**
     * Function to handle image cropping.
     * @async
     */
    const getCropData = async () => {
        try {
            setheaderImgUrl("wait")
            setcropdone(true);
            const cropper = cropperRef.current?.cropper;
            const canvas = cropper.getCroppedCanvas();
            if (canvas) {
                const blob = await new Promise(resolve => canvas.toBlob(resolve));
                const imageUrl = await uploadImageToCloudinary(blob); // Upload the cropped image to Cloudinary
                setheaderImgUrl(imageUrl);
            }
        } catch (error) {
            console.error("Error cropping and uploading image:", error);
        }
    };

    return (
        <fieldset className="bg-white p-6 gap-[20px] rounded-[30px] bg-opacity-30 backdrop-blur-[5px] shadow-dashBoardCardImageShadow flex flex-col">
        
            <label className="text-[1.6rem] font-extrabold underline uppercase tracking-wider text-center">Upload Images</label>
            <label htmlFor="file-upload" className="text-stone h-16 bg-opacity-45 backdrop-blur-[6px] w-[300px] px-4 items-center outline-0 rounded-[30px] text-lg leading-[64px] placeholder-stone bg-white bg-opacity-47 shadow-dashBoardCardImageShadow">
  Upload Image
</label>
            <input
            className="hidden"
                id="file-upload"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => {
                    setcropdone(false);
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setheaderImgUrl(reader.result);
                    };
                    reader.readAsDataURL(file);
                }}
            />
            {!iscropdone && (
                <div>
                    <Cropper
                        ref={cropperRef}
                        src={headerImgUrl}
                        style={{ height: 400, width: "100%" }}
                        aspectRatio={aspectRatio}
                        guides={false}
                    />
                    <button onClick={getCropData}>Crop and select</button>
                </div>
            )}
        </fieldset>
    );
};

ImageCropper.propTypes = {
    /** The URL of the image to be cropped. */
    headerImgUrl: PropTypes.string.isRequired,
    /** Function to set the URL of the cropped image. */
    setheaderImgUrl: PropTypes.func.isRequired,
    /** The aspect ratio of the cropping area. */
    aspectRatio: PropTypes.number,
};

export default ImageCropper;
