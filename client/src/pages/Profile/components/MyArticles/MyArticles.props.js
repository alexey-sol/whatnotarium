import { array, func, object } from "prop-types";

export const defaultProps = {
    posts: []
};

export const propTypes = {
    currentUser: object.isRequired,
    onGetPostsStart: func.isRequired,
    posts: array
};
