// InputField.js
import React from "react";
import PropTypes from "prop-types";
import styles from "./biginputs.module.css";

function InputField({ name = "none", placeholder, type, value, onChange, required, backgroundColor, outline }) {
    const inputStyle = {
        backgroundColor: backgroundColor || 'white', // Set default background color to white if not provided
        outline: outline ? '1px solid black' : 'none', // Apply outline style if outline prop is true
    };

    return (
        <input
            className={styles.input}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            style={inputStyle}
            name={name} // Add the name attribute
        />
    );
}

InputField.propTypes = {
    name: PropTypes.string, // Add name prop type
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    backgroundColor: PropTypes.string,
    outline: PropTypes.bool, // Add outline prop type
};

InputField.defaultProps = {
    outline: false, // Set default value of outline prop to false
};

export default InputField;
