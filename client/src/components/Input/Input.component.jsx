import React, { memo, useRef } from "react";
import classnames from "classnames";

import Tooltip from "components/Tooltip";
import { defaultProps, propTypes } from "./Input.props";
import styles from "./Input.module.scss";

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

function Input ({
    className,
    error,
    errorTooltipText,
    hasFixedTooltip,
    label,
    name,
    onChange,
    rootClassName,
    value,
    ...rest
}) {
    const errorSpanRef = useRef(null);

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

            {error && <span
                className={styles.errorText}
                ref={errorSpanRef}
            >
                {error}
            </span>}

            {errorTooltipText && <Tooltip
                elementRef={errorSpanRef}
                isFixed={hasFixedTooltip}
                text={errorTooltipText}
            />}
        </div>
    );
}

export default memo(Input);
