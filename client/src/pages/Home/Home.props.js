import { array, func, object } from "prop-types";

export const defaultProps = {
    posts: [],
    postsPending: {}
};

export const propTypes = {
    onGetPostsStart: func.isRequired,
    posts: array,
    postsPending: object
};
