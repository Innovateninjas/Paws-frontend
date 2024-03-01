import React from 'react';
import PropTypes from 'prop-types';
import ImageUploading from 'react-images-uploading';
import { MdDelete } from 'react-icons/md';
import { Camera } from 'react-bootstrap-icons';
import styles from "./ImageUploader.module.css"; // Import styles for the component

/**
 * Image uploader component for uploading and displaying images.
 * @param {Object} props - The props for the component.
 * @param {string} props.image - The URL of the currently selected image.
 * @param {Function} props.setImage - Function to set the selected image.
 * @param {Function} props.onChange - Function to handle changes when an image is uploaded.
 * @returns {JSX.Element} A React component representing the image uploader.
 */
const ImageUploader = ({formData , setFormData, onChange }) => {
    return (
        <ImageUploading
            value={[formData]} // Pass the selected image as an array
            onChange={onChange}
            dataURLKey="data_url"
        >
            {({ onImageUpload, isDragging, dragProps }) => (
                <div className={styles.wrapper}>
                    {formData.image && (
                        <div className={styles.imageItem}>
                            <img src={formData.image} alt="" className={styles.imagePreview} />
                        </div>
                    )}
                    <div className={styles.buttons}>
                        {formData.image ? (
                            <div>
                                <button className={styles.removeButton} onClick={() =>
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        image: null,
                                    }))
                                     }>
                                    <MdDelete />
                                    <span>Remove</span>
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className={styles.Uploadarea}>
                                    <button
                                        className={`${styles.imageUploadButton} ${isDragging && styles.dragging}`}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >
                                        <div className='styles.addbtn'>
                                            <Camera className={styles.icon} />
                                            <span> </span>
                                            <span>Add Image</span>
                                        </div>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </ImageUploading>
    );
};

ImageUploader.propTypes = {
    // image: PropTypes.string,
    // setImage: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default ImageUploader;
