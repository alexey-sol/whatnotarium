import { func, string } from "prop-types";

export const defaultProps = {
    label: "",
    rootClassName: "",
};

export const propTypes = {
    label: string,
    onChange: func.isRequired,
    rootClassName: string
};
