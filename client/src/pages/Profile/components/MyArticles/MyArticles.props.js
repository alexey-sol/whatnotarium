import { array, func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    posts: []
};

export const propTypes = {
    currentUser: object,
    onGetPostsStart: func.isRequired,
    posts: array
};
