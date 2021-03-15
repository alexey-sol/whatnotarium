import { func, string } from "prop-types";

export const defaultProps = {
    label: ""
};

export const propTypes = {
    label: string,
    onChange: func.isRequired
};
