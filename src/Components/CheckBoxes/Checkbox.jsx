import React from "react";
import PropTypes from "prop-types";
import styles from "./Checkbox.module.css";

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
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
};

export default Checkbox;
