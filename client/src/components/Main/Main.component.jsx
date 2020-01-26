import React from "react";

import { defaultProps, propTypes } from "./Main.props";
import styles from "./Main.module.scss";

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

function Main ({ children }) {
    return (
        <div className={styles.container}>
            { children }
        </div>
    );
}

export default Main;
