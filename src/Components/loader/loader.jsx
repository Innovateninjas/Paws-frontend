import React from 'react';
import { Watch } from 'react-loader-spinner';
import styles from './loader.module.css';

function Loader() {
    return (
        <div className={styles.spinnerContainer}>
            <h2 className={styles.loadingText}>Loading...</h2>
            <Watch
                visible={true}
                height={80}
                width={80}
                radius={40}
                color="#4fa94d"
                ariaLabel="watch-loading"
                wrapperClass={styles.spinner}
            />
        </div>
    );
}

export default Loader;
