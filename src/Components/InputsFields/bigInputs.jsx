// InputField.js
import React from "react";
import PropTypes from "prop-types";
import styles from "./biginputs.module.css";

function InputField({ placeholder, type, value, onChange, required }) {
    return (
        <input
            className={styles.input}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
        />
    );
}

InputField.propTypes = {
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
};

export default InputField;
