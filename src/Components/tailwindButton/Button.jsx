import React from 'react'
import PropTypes from 'prop-types';
import {twMerge } from 'tailwind-merge';
const Button = ({ text, clas, onClick }) => {

    // text-base mt-3 text-white  focus:outline-none rounded-[30px] px-5 py-4 bg-opacity-20 font-semibold
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

