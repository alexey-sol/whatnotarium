import { object } from "prop-types";

export const defaultProps = {
    currentPost: {},
    currentUser: null
};

export const propTypes = {
    currentPost: object,
    currentUser: object
};
