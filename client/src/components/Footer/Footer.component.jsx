import React from "react";

import styles from "./Footer.module.scss";

function Footer () {
    return (
        <div className={styles.container}>
            <div className={styles.aside} />

            <div className={styles.content}>
                Footer
            </div>
        </div>
    );
}

export default Footer;
