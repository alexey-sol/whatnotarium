import React from "react";
import classnames from "classnames";

import { defaultProps, propTypes } from "./BaseIconButton.props";
import styles from "./BaseIconButton.module.scss";

BaseIconButton.propTypes = propTypes;
BaseIconButton.defaultProps = defaultProps;

function BaseIconButton ({
    children,
    className,
    disabled,
    onClick,
    size,
    title
}) {
    const dynamicStyle = {
        height: size,
        width: size,
        boxSizing: "border-box"
    };

    const buttonClassName = classnames(
        styles.container,
        className,
        (disabled) ? styles.disabled : ""
    );

    return (
        <div
            className={buttonClassName}
            onClick={onClick}
            style={dynamicStyle}
            title={title}
        >
            {children}
        </div>
    );
}

export default BaseIconButton;
