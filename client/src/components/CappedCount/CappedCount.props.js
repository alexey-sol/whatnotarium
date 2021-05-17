import { bool, number } from "prop-types";

export const defaultProps = {
    count: 0,
    showDynamics: false
};

export const propTypes = {
    count: number,
    showDynamics: bool
};
