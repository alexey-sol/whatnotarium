import React from "react";

import Logo from "components/Logo";
import styles from "./Header.module.scss";

function Header () {
    return (
        <header className={styles.container}>
            <section className={styles.content}>
                <Logo />
            </section>
        </header>
    );
}

export default Header;
