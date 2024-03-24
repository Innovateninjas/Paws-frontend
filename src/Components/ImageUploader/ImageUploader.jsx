import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageUploading from 'react-images-uploading';
import { MdDelete } from 'react-icons/md';
import { Camera, CameraReels } from 'react-bootstrap-icons';
import styles from "./ImageUploader.module.css"; // Import styles for the component

const ImageUploader = ({ formData, setFormData, onChange }) => {
    const [cameraActive, setCameraActive] = useState(false);
    const [cameraFacingMode, setCameraFacingMode] = useState('user'); // 'user' for front camera, 'environment' for back camera
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

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

    const captureImage = () => {
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = canvasRef.current.toDataURL('image/png');
        setFormData({ ...formData, image: imageData });
        setCameraActive(false);
    };

    return (
        <div className={styles.wrapper}>
            {cameraActive ? (
                <div className={styles.cameraContainer}>
                    <video ref={videoRef} className={styles.camera} />
                    <canvas ref={canvasRef} className={styles.hiddenCanvas} width={640} height={480} />
                    <div className={styles.cameraControls}>
                        <button className={styles.captureButton} onClick={captureImage}>Capture</button>
                        <button className={styles.switchCameraButton} onClick={toggleCameraFacingMode}>
                            {cameraFacingMode === 'user' ? <CameraReels /> : <Camera />}
                        </button>
                    </div>
                </div>
            ) : (
                <ImageUploading
                    value={[formData]}
                    onChange={onChange}
                    dataURLKey="data_url"
                >
                    {({ onImageUpload, isDragging, dragProps }) => (
                        <>
                            <div className={styles.imagePreviewContainer}>
                                {formData.image && (
                                    <div className={styles.imageItem}>
                                        <img src={formData.image} alt="" className={styles.imagePreview} />
                                    </div>
                                )}
                            </div>
                            <div className={styles.buttons}>
                                <button
                                    className={`${styles.imageUploadButton} ${isDragging && styles.dragging}`}
                                    onClick={handleCameraCapture}
                                    {...dragProps}
                                >
                                    <div className={styles.addbtn}>
                                        <Camera className={styles.icon} />
                                        <span>Add Image</span>
                                    </div>
                                </button>
                            </div>
                        </>
                    )}
                </ImageUploading>
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
