import React from 'react';
import PropTypes from 'prop-types';
import { Watch } from 'react-loader-spinner';
import styles from './loader.module.css';

/**
 * Loader component to display a loading spinner.
 * @param {object} props - The props of the Loader component.
 * @param {boolean} props.visible - Whether the loader should be visible or not. (Mandatory)
 * @param {number} [props.height=80] - The height of the loader spinner. (Optional)
 * @param {number} [props.width=80] - The width of the loader spinner. (Optional)
 * @param {number} [props.radius=40] - The radius of the loader spinner. (Optional)
 * @param {string} [props.color="#4fa94d"] - The color of the loader spinner. (Optional)
 * @param {string} [props.ariaLabel="watch-loading"] - The ARIA label for accessibility. (Optional)
 * @param {string} [props.wrapperClass] - Additional CSS class for the wrapper element. (Optional)
 * @returns {JSX.Element} Loader component.
 */
function Loader({ visible, height = 80, width = 80, radius = 40, color = "#4fa94d", ariaLabel = "watch-loading", wrapperClass }) {
    return (
        <div className={`${styles.spinnerContainer} ${wrapperClass}`}>
            <h2 className={styles.loadingText}>Loading...</h2>
            <Watch
                visible={visible}
                height={height}
                width={width}
                radius={radius}
                color={color}
                ariaLabel={ariaLabel}
                wrapperClass={styles.spinner}
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
