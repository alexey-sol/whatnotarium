import React from "react";
import classnames from "classnames";

import { defaultProps, propTypes } from "./BaseButton.props";
import styles from "./BaseButton.module.scss";

BaseButton.propTypes = propTypes;
BaseButton.defaultProps = defaultProps;

function BaseButton ({
    className,
    disabled,
    onClick,
    theme,
    title,
    width,
    ...rest
}) {
    const buttonClassName = classnames(
        styles.button,
        className,
        width && styles[`${width}Width`],
        theme && styles[`${theme}Theme`],
        (disabled) ? styles.disabled : ""
    );

    return (
        <button
            {...rest}
            className={buttonClassName}
            disabled={disabled}
            onClick={onClick}
        >
            {title}
        </button>
    );
}

export default BaseButton;
