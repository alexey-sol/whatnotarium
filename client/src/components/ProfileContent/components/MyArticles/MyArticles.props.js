import { object } from "prop-types";

export const defaultProps = {
    posts: {}
};

export const propTypes = {
    currentUser: object.isRequired,
    posts: object
};
