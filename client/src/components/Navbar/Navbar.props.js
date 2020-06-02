import { object } from "prop-types";

export const defaultProps = {
    affectedPost: {},
    currentUser: null
};

export const propTypes = {
    affectedPost: object,
    currentUser: object
};
