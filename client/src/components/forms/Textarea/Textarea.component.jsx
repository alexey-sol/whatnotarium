import React, { memo } from "react";
import classnames from "classnames";

import { defaultProps, propTypes } from "./Textarea.props";
import styles from "./Textarea.module.scss";

Textarea.defaultProps = defaultProps;
Textarea.propTypes = propTypes;

function Textarea ({
    className,
    label,
    onChange,
    rootClassName,
    value,
    ...rest
}) {
    const hasValue = value?.length > 0;
    const labelClassName = classnames(styles.label, (hasValue) ? styles.shrink : "");

    return (
        <div className={classnames(styles.container, rootClassName)}>
            <textarea
                {...rest}
                className={classnames(styles.textarea, (hasValue) ? styles.expanded : "")}
                onChange={onChange}
                value={value || ""}
            />

            {label && (
                <span className={labelClassName}>
                    {label}
                </span>
            )}
        </div>
    );
}

export default memo(Textarea);
