import React from "react";
import { useField } from "formik";

import Textarea from "components/forms/Textarea";
import { defaultProps, propTypes } from "./FormTextarea.props";
import styles from "./FormTextarea.module.scss";

FormTextarea.defaultProps = defaultProps;
FormTextarea.propTypes = propTypes;

function FormTextarea ({ label, onChange, ...props }) {
    const [field] = useField(props);

    return (
        <Textarea
            {...field}
            {...props}
            label={label}
            rootClassName={styles.container}
        />
    );
}

export default FormTextarea;
