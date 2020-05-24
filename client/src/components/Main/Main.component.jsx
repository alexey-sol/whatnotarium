import React from "react";

import { defaultProps, propTypes } from "./Main.props";
import styles from "./Main.module.scss";

Main.defaultProps = defaultProps;
Main.propTypes = propTypes;

function Main ({ children }) {
    return (
        <main className={styles.container}>
            { children }
        </main>
    );
}

export default Main;
