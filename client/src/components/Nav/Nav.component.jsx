import React from "react";

import Menu from "components/Menu";
import styles from "./Nav.module.scss";

function Nav () {
    return (
        <nav className={styles.container}>
            <Menu />
        </nav>
    );
}

export default Nav;
