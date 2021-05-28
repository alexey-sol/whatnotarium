import React from "react";
import moment from "moment";

import styles from "./Footer.module.scss";

function Footer () {
    const currentYear = moment().format("YYYY");

    return (
        <footer className={styles.container}>
            <section className={styles.content}>
                All rites reversed. {currentYear}.
            </section>
        </footer>
    );
}

export default Footer;
