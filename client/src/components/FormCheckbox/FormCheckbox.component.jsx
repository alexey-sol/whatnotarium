import React from "react";
import { useField } from "formik";

import Checkbox from "components/Checkbox";
import { defaultProps, propTypes } from "./FormCheckbox.props";

FormCheckbox.defaultProps = defaultProps;
FormCheckbox.propTypes = propTypes;

function FormCheckbox ({ label, onChange, ...props }) {
    const [field] = useField(props);

    return (
        <Checkbox
            {...field}
            {...props}
            label={label}
            onChange={onChange}
        />
    );
}

export default FormCheckbox;
