import { Link } from "react-router-dom";
import React from "react";

import styles from "./Header.module.scss";

function Header () {
    return (
        <header className={styles.container}>
            <section className={styles.content}>
                <div className={styles.logo}>
                    <Link
                        title="На главную"
                        to="/"
                    >
                        Geek Regime
                    </Link>
                </div>
            </section>
        </header>
    );
}

export default Header;
