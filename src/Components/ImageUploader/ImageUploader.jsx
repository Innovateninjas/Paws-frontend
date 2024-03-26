import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageUploading from 'react-images-uploading';
import { Camera, CameraReels } from 'react-bootstrap-icons'; // Import styles for the component
import { uploadImageToCloudinary } from '../utils/Functions/imageUploader'; // Import the function to upload images to Cloudinary

const ImageUploader = ({ formData, setFormData, onChange }) => {
    const [cameraActive, setCameraActive] = useState(false);
    const [cameraFacingMode, setCameraFacingMode] = useState('user'); // 'user' for front camera, 'environment' for back camera
    const videoRef = useRef(null);

    useEffect(() => {
        if (cameraActive) {
            startCamera();
        } else {
            stopCamera();
        }

        return () => {
            stopCamera();
        };
    }, [cameraActive]);

    const handleCameraCapture = () => {
        setCameraActive(true);
    };

    const toggleCameraFacingMode = () => {
        setCameraFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'));
        stopCamera();
        startCamera();
    };

    const startCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: cameraFacingMode } })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            })
            .catch(error => {
                console.error('Error accessing camera:', error);
            });
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();

            tracks.forEach(track => {
                track.stop();
            });

            videoRef.current.srcObject = null;
        }
    };

    const captureImage = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/png');

        try {
            const imageUrl = await uploadImageToCloudinary(dataURLtoFile(imageData, 'image.png'));
            setFormData({ ...formData, image: imageUrl });
            setCameraActive(false);
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            // Handle error here
        }
    };

    // Convert data URL to File object
    const dataURLtoFile = (dataUrl, filename) => {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const handleImageUpload = async (imageList) => {
        // Assuming you want to handle multiple images but only keep the first one
        if (imageList.length > 0) {
            const imageData = imageList[0].data_url;
            try {
                const imageUrl = await uploadImageToCloudinary(dataURLtoFile(imageData, 'image.png'));
                setFormData({ ...formData, image: imageUrl });
                // Call the onChange function after the image is uploaded
                onChange(imageList);
            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error);
                // Handle error here
            }
        }
    };

    return (
        <div className="relative z-50 pt-0 pb-4"> {/* Set z-index to 50 */}
            <ImageUploading
                value={[formData]}
                onChange={handleImageUpload}
                dataURLKey="data_url"
            >
                {({ onImageUpload, isDragging, dragProps }) => (
                    <div className="relative flex flex-col items-center p-5 rounded-8xl ">
                    <div className="w-[23rem] h-[15rem] bg-white bg-opacity-57  shadow-lg ring-1 ring-gray-300 flex justify-center border-1 items-center p-4 rounded-3xl  backdrop-blur-[6px] ">
                        {formData.image ? (
                            <img src={formData.image} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                            <Camera className="text-gray-400 h-12 w-12" />
                        )}
                    </div>
                    <div className="absolute bottom-0 flex justify-center space-x-4">
                        <button
                            className={`text-base mt-3 text-white bg-gradient-to-b from-blue-300 to-blue-800 focus:outline-none rounded-[30px] px-5 py-4 bg-opacity-20 font-semibold ${isDragging && 'opacity-50'}`}
                            onClick={handleCameraCapture}
                            {...dragProps}
                        >
                            {isDragging ? 'Uploading...' : 'Take Photo'}
                        </button>
                        <button
                            className="text-base mt-3 text-white bg-gradient-to-b from-blue-300 to-emerald-500 focus:outline-none rounded-[30px] px-5 py-4 bg-opacity-20 font-semibold"
                            onClick={onImageUpload}
                        >
                            Add Photo
                        </button>
                    </div>
                </div>
                )}
            </ImageUploading>

            {cameraActive && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <video ref={videoRef} className="w-full h-full" style={{ height: '50vh' }} />
                        <div className="flex justify-center mt-4">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded mr-2" onClick={captureImage}>Capture</button>
                            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 rounded" onClick={toggleCameraFacingMode}>
                                {cameraFacingMode === 'user' ? <CameraReels /> : <Camera />}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

ImageUploader.propTypes = {
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default ImageUploader;
