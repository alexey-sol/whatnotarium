import { func, number } from "prop-types";

export const defaultProps = {
    size: 24
};

export const propTypes = {
    onClick: func.isRequired,
    size: number
};
