import React from "react";

import ActionsMenu from "components/ActionsMenu";
import Navbar from "components/Navbar";
import styles from "./Menu.module.scss";

function Menu () {
    return (
        <div className={styles.container}>
            <ActionsMenu />
            <Navbar />
        </div>
    );
}

export default Menu;
