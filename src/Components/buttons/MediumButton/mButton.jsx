import React from "react";
import PropTypes from "prop-types";

/**
 * Button component.
 * @param {Object} props - The component props.
 * @param {string} props.text - The text content of the button. (Required)
 * @param {Function} props.onClick - Function to call when the button is clicked. (Required)
 * @param {Object} [props.customstyle] - Custom styles to override default styles.
 * @returns {JSX.Element} Button component.
 */
const MButton = ({ text, icon,onClick, customstyle }) => {
    // Merge default styles with custom styles if provided
    const defaultStyles = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "14px",
        background: "#333333",
        boxShadow: "2px 3px 4px black",
        padding: "20px 0",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        justifyContent: "center",
        marginTop: "0.675rem",
        fontSize: "24px",
        fontWeight: "700",
        border: "2px solid #7d7d7d",
        outline: "0",
        color: "white",
        width: "250px",
        ...customstyle, // Merge custom styles
    };

    return (
        <button style={defaultStyles} onClick={onClick}>
            {text}{icon}
        </button>
    );
};

MButton.propTypes = {
    /** The text content of the button. */
    text: PropTypes.string.isRequired,
    /** Function to call when the button is clicked. */
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.element.isRequired, 
    /** Custom styles to override default styles. */
    customstyle: PropTypes.object,
};

export default MButton;
