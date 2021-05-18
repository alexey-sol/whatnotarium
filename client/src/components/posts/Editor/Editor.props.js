import { func, string } from "prop-types";

export const defaultProps = {
    content: ""
};

export const propTypes = {
    content: string,
    handleChange: func.isRequired,
    setEditor: func.isRequired
};
