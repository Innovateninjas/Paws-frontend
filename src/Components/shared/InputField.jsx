import React from "react";
import PropTypes from "prop-types";

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
    className,
    min,
}) {

    if (type === 'textarea') {
        return (
            <textarea
                className={className}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                name={name}
            />
        );
    } 
    else if (type === 'date') {
        return (
            <>
            <input
                className={className}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                name={name}
                min={min}
            />
            </>
        );
    }
    else {
        return (
            <input
                className={className}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                name={name}
            />
        );
    }
}

InputField.propTypes = {
    /** The name attribute of the input field. */
    name: PropTypes.string,
    /** The placeholder text for the input field. */
    placeholder: PropTypes.string,
    /** The type of input field (e.g., "text", "password"). */
    type: PropTypes.string.isRequired,
    /** The value of the input field. */
    value: PropTypes.string.isRequired,
    /** Function to call when the input value changes. */
    onChange: PropTypes.func.isRequired,
    /** Whether the input field is required. */
    required: PropTypes.bool,
    className: PropTypes.string
};

InputField.defaultProps = {
    /** The default value of the name attribute. */
    name: "none",
};

export default InputField;
