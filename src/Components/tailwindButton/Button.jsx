import React from 'react'
import PropTypes from 'prop-types';
import {twMerge } from 'tailwind-merge';
const Button = ({ text, clas, onClick }) => {
    var baseClass = "text-base focus:outline-none rounded-[30px] px-10 py-4 font-semibold ";  
    return (
        <button className={twMerge(baseClass, clas)} onClick={onClick}>{text}</button>
    )
}

Button.propTypes = {
    text: PropTypes.string,
    clas: PropTypes.string,
    onClick: PropTypes.func
}

export default Button

