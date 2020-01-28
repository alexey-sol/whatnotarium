import React, { memo } from "react";
import classnames from "classnames";

import { defaultProps, propTypes } from "./Input.props";
import styles from "./Input.module.scss";

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

function Input ({
    className,
    label,
    name,
    onChange,
    rootClassName,
    value,
    ...rest
}) {
    const hasValue = value.length > 0;

    const labelClassName = classnames(
        styles.label,
        (hasValue) ? styles.shrink : ""
    );

    return (
        <div className={classnames(styles.container, rootClassName)}>
            <input
                {...rest}
                className={classnames(styles.input, className)}
                name={name}
                onChange={onChange}
            />

            {label && <label className={labelClassName}>
                {label}
            </label>}
        </div>
    );
}

export default memo(Input);
