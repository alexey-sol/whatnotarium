import React from "react";

import ActionMenu from "components/ActionMenu";
import Navbar from "components/Navbar";
import styles from "./Menu.module.scss";

function Menu () {
    return (
        <div className={styles.container}>
            <ActionMenu />
            <Navbar />
        </div>
    );
}

export default Menu;
