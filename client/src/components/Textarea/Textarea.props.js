import { func, string } from "prop-types";

export const defaultProps = {
    className: "",
    label: "",
    rootClassName: "",
    value: ""
};

export const propTypes = {
    className: string,
    label: string,
    onChange: func.isRequired,
    rootClassName: string,
    value: string
};
