import React from "react";
import classnames from "classnames";

import { defaultProps, propTypes } from "./BaseButton.props";
import styles from "./BaseButton.module.scss";

BaseButton.defaultProps = defaultProps;
BaseButton.propTypes = propTypes;

function BaseButton ({
    className,
    disabled,
    onClick,
    text,
    theme,
    type,
    width,
    ...rest
}) {
    const containerClassName = classnames(
        styles.button,
        styles[`${width}Width`],
        className,
        theme && styles[`${theme}Theme`],
        (disabled) ? styles.disabled : ""
    );

    return (
        <button
            {...rest}
            className={containerClassName}
            disabled={disabled}
            onClick={onClick}
            type={type}
        >
            {text}
        </button>
    );
}

export default BaseButton;
