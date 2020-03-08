import { Link } from "react-router-dom";
import React from "react";

import styles from "./Header.module.scss";

function Header () {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.logo}>
                    <Link
                        title="На главную"
                        to="/"
                    >
                        Geek Regime
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
