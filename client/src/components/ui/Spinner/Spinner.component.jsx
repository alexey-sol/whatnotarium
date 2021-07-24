import React from "react";
import ReactDOM from "react-dom";

import styles from "./Spinner.module.scss";

function Spinner () {
    const spinnerElem = (
        <div className={styles.overlay}>
            <div className={styles.spinner} />
        </div>
    );

    return ReactDOM.createPortal(
        spinnerElem,
        document.body
    );
}

export default Spinner;
