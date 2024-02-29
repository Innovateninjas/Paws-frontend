import React from "react";
import PropTypes from "prop-types";
import styles from "./biginputs.module.css";

/**
 * InputField component for text input.
 * @param {Object} props - The component props.
 * @param {string} [props.name="none"] - The name attribute of the input field.
 * @param {string} props.placeholder - The placeholder text for the input field. (Required)
 * @param {string} props.type - The type of input field (e.g., "text", "password"). (Required)
 * @param {string} props.value - The value of the input field. (Required)
 * @param {Function} props.onChange - Function to call when the input value changes. (Required)
 * @param {boolean} [props.required] - Whether the input field is required.
 * @param {string} [props.backgroundColor] - The background color of the input field.
 * @param {boolean} [props.outline] - Whether to display an outline around the input field.
 * @param {string} [props.margin="none"] - The margin of the input field.
 * @param {string} [props.boxShadow="none"] - The box shadow of the input field.
 * @returns {JSX.Element} InputField component.
 */
function InputField({
    name = "none",
    placeholder="",
    type="text",
    value = "",
    onChange,
    required,
    backgroundColor,
    outline,
    margin = "none",
    min,
    boxShadow = "none"
}) {
    // Apply styles dynamically based on props
    const inputStyle = {
        backgroundColor: backgroundColor || 'white', // Default background color to white if not provided
        outline: outline ? '1px solid black' : 'none', // Apply outline style if outline prop is true
        margin: margin,
        boxShadow: boxShadow
    };

    if (type === 'textarea') {
        return (
            <textarea
                className={styles.inputArea}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                style={inputStyle}
                name={name}
            />
        );
    } 
    else if (type === 'date') {
        return (
            <input
                className={styles.inputArea}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                style={inputStyle}
                name={name}
                min={min}
            />
        );
    }
    else {
        return (
            <input
                className={styles.input}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                style={inputStyle}
                name={name}
            />
        );
    }
}

InputField.propTypes = {
    /** The name attribute of the input field. */
    name: PropTypes.string,
    /** The placeholder text for the input field. */
    placeholder: PropTypes.string.isRequired,
    /** The type of input field (e.g., "text", "password"). */
    type: PropTypes.string.isRequired,
    /** The value of the input field. */
    value: PropTypes.string.isRequired,
    /** Function to call when the input value changes. */
    onChange: PropTypes.func.isRequired,
    /** Whether the input field is required. */
    required: PropTypes.bool,
    /** The background color of the input field. */
    backgroundColor: PropTypes.string,
    /** Whether to display an outline around the input field. */
    outline: PropTypes.bool,
    /** The margin of the input field. */
    margin: PropTypes.string,
    /** The box shadow of the input field. */
    boxShadow: PropTypes.string
};

InputField.defaultProps = {
    /** The default value of the name attribute. */
    name: "none",
    /** The default value of the outline prop. */
    outline: false,
    /** The default value of the margin prop. */
    margin: "none",
    /** The default value of the boxShadow prop. */
    boxShadow: "none"
};

export default InputField;
