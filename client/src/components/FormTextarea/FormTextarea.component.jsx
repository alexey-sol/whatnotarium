import React from "react";
import { useField } from "formik";
import classnames from "classnames";

import { defaultProps, propTypes } from "./FormTextarea.props";
import styles from "./FormTextarea.module.scss";

FormTextarea.defaultProps = defaultProps;
FormTextarea.propTypes = propTypes;

function FormTextarea ({ label, onChange, ...props }) {
    const [field] = useField(props);
    const { value } = field;

    const hasValue = value?.length > 0;
    const labelClassName = classnames(styles.label, (hasValue) ? styles.shrink : "");

    return (
        <div className={styles.container}>
            <textarea
                {...field}
                {...props}
                className={classnames(styles.textarea, (hasValue) ? styles.expanded : "")}
                maxLength="200"
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

export default FormTextarea;
