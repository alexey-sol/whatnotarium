import React from "react";
import ReactDOM from "react-dom";

import styles from "./Loader.module.scss";

function Loader () {
    const loaderElem = (
        <div className={styles.overlay}>
            <div className={styles.loader}>
                {[1, 2, 3].map(elem => <div key={elem} />)}
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        loaderElem,
        document.body
    );
}

export default Loader;
