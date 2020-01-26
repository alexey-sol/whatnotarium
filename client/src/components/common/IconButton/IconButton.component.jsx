import React from "react";

import { defaultProps, propTypes } from "./IconButton.props";
import styles from "./IconButton.module.scss";

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;

function IconButton ({ children, onClick, size }) {
    const dynamicStyle = {
        height: size,
        width: size,
        boxSizing: "border-box"
    };

    return (
        <div
            className={styles.container}
            onClick={onClick}
            style={dynamicStyle}
        >
            {children}
        </div>
    );
}

export default IconButton;
