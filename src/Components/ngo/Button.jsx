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
        // borderRadius: "40px",
        // background: 'linear-gradient(180deg, rgba(200, 135, 251, 0.94) 0%, rgba(241, 159, 254, 0.54) 100%)',
        boxShadow: "2px 3px 4px black",
        padding: "20px 30px",
        marginTop: "0.675rem",
        // fontSize: "24px",
        backdropFilter: "blur(10px)",
        fontWeight: "700",
        outline: "0",
        color: "white",
        ...customstyle, // Merge custom styles
    };

    return (
        <button style={defaultStyles} className="text-white focus:outline-none rounded-[40px] md:rounded-[45px] shadow-buttonShadow bg-gradient-to-b from-green-600 to-green-700 drop-shadow-md py-3 px-4 text-[1.5rem] md:text-[2rem] cursor-pointer" onClick={onClick}>
            {text}{icon}
        </button>
    );
};

MButton.propTypes = {
    /** The text content of the button. */
    text: PropTypes.string.isRequired,
    /** Function to call when the button is clicked. */
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.element, 
    /** Custom styles to override default styles. */
    customstyle: PropTypes.object,
};

export default MButton;
