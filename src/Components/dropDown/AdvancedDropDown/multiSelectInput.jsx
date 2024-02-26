import React from "react";
import PropTypes from "prop-types";
import Select from 'react-dropdown-select'; //documentation https://react-dropdown-select.netlify.app/
import { create } from "@mui/material/styles/createTransitions";
/**
 * Custom select component with customizable styling and options.
 * @param {object} props - Component props.
 * @param {Array} props.options - Array of options for the select.
 * @param {string} [props.placeholder="Select"] - Placeholder text for the select.
 * @param {string} [props.selectAllLabel="Select all"] - Label for the select all option.
 * @param {string} [props.clearAllLabel="Clear"] - Label for the clear all option.
 * @param {function} [props.onChange] - Callback function called when selection changes.
 * @param {string} [props.valueField="value"] - Property of option object to be used as the value.
 * @param {string} [props.labelField="label"] - Property of option object to be used as the label.
 * @param {object} [props.style] - Custom styles to be applied to the select.
 * @returns {JSX.Element} Custom select component.
 */
const CustomSelect = ({
    options,
    create,
    searchBy,
    placeholder,
    selectAllLabel,
    clearAllLabel,
    onChange,
    valueField,
    labelField,
    ...restProps
}) => {


    return (
        <Select
            multi
            options={options}
            searchBy={searchBy}
            placeholder={placeholder}
            selectAllLabel={selectAllLabel}
            clearAllLabel={clearAllLabel}
            onChange={onChange}
            create={create}
            valueField={valueField}
            labelField={labelField}
            {...restProps}
            style={{
                boxShadow: "1px 1px 2px black",
                margin: "10px",
                height: "46px",
                fontSize: "16px",
                borderRadius: "10px",
                width: "300px",
                ...restProps.style // Merge passed styles
            }}
        />
    );
};

CustomSelect.propTypes = {
    options: PropTypes.array.isRequired,
    create: PropTypes.bool,
    placeholder: PropTypes.string,
    selectAllLabel: PropTypes.string,
    clearAllLabel: PropTypes.string,
    onChange: PropTypes.func,
    valueField: PropTypes.string,
    labelField: PropTypes.string,
    style: PropTypes.object,
};

CustomSelect.defaultProps = {
    create: false,
    placeholder: "Select",
    selectAllLabel: "Select all",
    clearAllLabel: "Clear",
    valueField: "value",
    labelField: "label",
};

export default CustomSelect;
