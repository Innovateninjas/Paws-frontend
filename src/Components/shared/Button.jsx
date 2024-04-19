import React from 'react'
import PropTypes from 'prop-types';
import {twMerge } from 'tailwind-merge';
const Button = ({ text, clas, onClick,disabled }) => {

    var baseClass = "text-white focus:outline-none rounded-[30px] shadow-buttonShadow bg-gradient-to-b from-green-600 to-green-700 rounded-[35px] drop-shadow-md shadow-buttonShadow py-3 px-4 text-[1.5rem] ";  
    return (
        <button className={twMerge(baseClass, clas)} disabled={disabled} onClick={onClick}>{text}</button>
    )
}

Button.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    clas: PropTypes.string,
    onClick: PropTypes.func
}

export default Button

