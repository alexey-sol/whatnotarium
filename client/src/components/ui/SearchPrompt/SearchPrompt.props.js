import { func, string } from "prop-types";

export const defaultProps = {
    title: ""
};

export const propTypes = {
    onClick: func.isRequired,
    title: string
};
