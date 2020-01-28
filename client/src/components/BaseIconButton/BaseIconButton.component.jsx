import React from "react";
import classnames from "classnames";

import { defaultProps, propTypes } from "./BaseIconButton.props";
import styles from "./BaseIconButton.module.scss";

BaseIconButton.propTypes = propTypes;
BaseIconButton.defaultProps = defaultProps;

function BaseIconButton ({ children, className, onClick, size }) {
    const dynamicStyle = {
        height: size,
        width: size,
        boxSizing: "border-box"
    };

    return (
        <div
            className={classnames(styles.container, className)}
            onClick={onClick}
            style={dynamicStyle}
        >
            {children}
        </div>
    );
}

export default BaseIconButton;
