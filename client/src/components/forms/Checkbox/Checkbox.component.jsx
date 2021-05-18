import React from "react";
import classnames from "classnames";

import { defaultProps, propTypes } from "./Checkbox.props";
import styles from "./Checkbox.module.scss";

Checkbox.defaultProps = defaultProps;
Checkbox.propTypes = propTypes;

function Checkbox ({
    label,
    onChange,
    rootClassName,
    ...props
}) {
    return (
        <label className={classnames(styles.container, rootClassName)}>
            <input
                {...props}
                onChange={onChange}
                type="checkbox"
            />

            <span>
                {label}
            </span>
        </label>
    );
}

export default Checkbox;
