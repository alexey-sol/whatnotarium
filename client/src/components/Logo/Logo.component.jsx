import React from "react";

import styles from "./Logo.module.scss";

function Logo () {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                Geek Regime
            </div>
        </div>
    );
}

export default Logo;
