import { Link } from "react-router-dom";
import React from "react";

import styles from "./Banner.module.scss";

function Banner () {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link
                    title="На главную"
                    to="/"
                >
                    Geek Regime
                </Link>
            </div>
        </div>
    );
}

export default Banner;
