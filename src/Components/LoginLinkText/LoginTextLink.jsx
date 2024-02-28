import React from "react";
import { Link } from "react-router-dom";
import styles from "./LoginTextLink.module.css";

function LoginTextLink({position, topPosition, bottomPosition }) {
    return (
        <p
            className={styles.text}
            style={{ 
                position: position || "absolute",
                top: topPosition, 
                bottom: bottomPosition }}
        >
            Already have an account?
            <Link to="/login" className={styles.LoginNow}>
                Login now!
            </Link>
        </p>
    );
}

export default LoginTextLink;
