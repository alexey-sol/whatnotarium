import React, { memo } from "react";
import classnames from "classnames";

import { defaultProps, propTypes } from "./Input.props";
import styles from "./Input.module.scss";

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

function Input ({
    className,
    error,
    label,
    name,
    onChange,
    rootClassName,
    value,
    ...rest
}) {
    const hasValue = value.length > 0;

    const inputClassName = classnames(
        styles.input,
        className,
        (error) ? styles.error : ""
    );

    const labelClassName = classnames(
        styles.label,
        (hasValue) ? styles.shrink : "",
        (error) ? styles.error : ""
    );

    return (
        <div className={classnames(styles.container, rootClassName)}>
            <input
                {...rest}
                className={inputClassName}
                name={name}
                onChange={onChange}
            />

            {label && <label className={labelClassName}>
                {label}
            </label>}

            {error && <span className={styles.errorText}>
                {error}
            </span>}
        </div>
    );
}

export default memo(Input);
