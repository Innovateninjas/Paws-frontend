import React from 'react';
import PropTypes from 'prop-types';
import { MagnifyingGlass } from 'react-loader-spinner';

function Loader({ visible, loadingText = "Loading...",height = 80, width = 80,radius = 40, color = "#4fa94d", ariaLabel = "watch-loading", wrapperClass }) { 
    return (  
        <div className={`fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 backdrop-blur-md z-50 ${wrapperClass}`}>
            <h2 className="font-serif text-2xl text-white mb-5">{loadingText}</h2>
            <MagnifyingGlass
                visible={visible}
                height={height}
                width={width}
                radius={radius}
                color={color}
                ariaLabel={ariaLabel}
                className="mt-5"
            />
        </div>
    );
}

Loader.propTypes = {
    visible: PropTypes.bool.isRequired,
    height: PropTypes.number,
    width: PropTypes.number,
    radius: PropTypes.number,
    color: PropTypes.string,
    ariaLabel: PropTypes.string,
    wrapperClass: PropTypes.string
};

export default Loader;
