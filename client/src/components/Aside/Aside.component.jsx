import React from "react";

import Menu from "components/Menu";
import styles from "./Aside.module.scss";

function Aside () {
    return (
        <div className={styles.container}>
            <Menu />
        </div>
    );
}

export default Aside;
