import React from "react";
import PropTypes from "prop-types";
import styles from "./Checkbox.module.css";

/**
 * Checkbox component for toggling a boolean value.
 * @param {Object} props - The component props.
 * @param {boolean} props.checked - The current state of the checkbox. (Required)
 * @param {Function} props.onChange - Function to call when the checkbox state changes. (Required)
 * @param {string} props.label - Text to display next to the checkbox. (Required)
 * @param {string} props.id - Unique identifier for the checkbox. (Required)
 * @param {string} [props.className] - Additional CSS classes to apply to the label.
 * @param {Object} [props.style] - Inline styles to apply to the input element.
 * @returns {JSX.Element} Checkbox component.
 */
function Checkbox({ checked, onChange, label, id, className, style }) {
    return (
        <label htmlFor={id} className={`${styles.checkboxLabel} ${className}`}>
            <input
                type="checkbox"
                id={id}
                className={styles.checkBox}
                checked={checked}
                onChange={onChange}
                style={style}
            />
            {label}
        </label>
    );
}

Checkbox.propTypes = {
    /** The current state of the checkbox. */
    checked: PropTypes.bool.isRequired,
    /** Function to call when the checkbox state changes. */
    onChange: PropTypes.func.isRequired,
    /** Text to display next to the checkbox. */
    label: PropTypes.string.isRequired,
    /** Unique identifier for the checkbox. */
    id: PropTypes.string.isRequired,
    /** Additional CSS classes to apply to the label. */
    className: PropTypes.string,
    /** Inline styles to apply to the input element. */
    style: PropTypes.object,
};

export default Checkbox;
