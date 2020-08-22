import { array, object } from "prop-types";

export const defaultProps = {
    userPosts: []
};

export const propTypes = {
    currentUser: object.isRequired,
    userPosts: array
};
