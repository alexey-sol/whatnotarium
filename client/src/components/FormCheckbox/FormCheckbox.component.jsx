import React from "react";
import { useField } from "formik";

import { defaultProps, propTypes } from "./FormCheckbox.props";
import styles from "./FormCheckbox.module.scss";

FormCheckbox.defaultProps = defaultProps;
FormCheckbox.propTypes = propTypes;

function FormCheckbox ({ label, onChange, ...props }) {
    const [field] = useField(props);

    return (
        <label className={styles.container}>
            <input
                {...field}
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

export default FormCheckbox;
