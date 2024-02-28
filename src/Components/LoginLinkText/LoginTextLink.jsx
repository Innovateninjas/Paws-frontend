import React from "react";
import { Link } from "react-router-dom";
import styles from "./LoginTextLink.module.css";

/**
 * A component representing a text link for logging in.
 * @param {Object} props - The props object containing component properties.
 * @param {string} [props.text="Already have an account?"] - The text to display before the link.
 * @param {string} [props.link="/login"] - The link URL.
 * @param {string} [props.linkText="Login now!"] - The text to display for the link.
 * @param {string} [props.position="absolute"] - The position CSS property for the text link.
 * @param {string} [props.topPosition] - The top CSS property for the text link.
 * @param {string} [props.bottomPosition] - The bottom CSS property for the text link.
 * @returns {JSX.Element} A JSX element representing the LoginTextLink component.
 */
function LoginTextLink({ text, link, linkText, position, topPosition, bottomPosition ,leftPosition, rightPosition}) {
    return (
        <p
            className={styles.text}
            style={{
                position: position || "absolute",
                top: topPosition,
                bottom: bottomPosition,
                left: leftPosition,
                right: rightPosition,
            }}
        >
            {text || "Already have an account?"}
            <Link to={link || "/login"} className={styles.LoginNow}>
                {linkText || "Login now!"}
            </Link>
        </p>
    );
}

export default LoginTextLink;
