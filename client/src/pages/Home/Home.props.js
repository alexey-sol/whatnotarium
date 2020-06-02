import { func, object } from "prop-types";

export const defaultProps = {
    fetchedPosts: {},
    posts: {}
};

export const propTypes = {
    fetchedPosts: object,
    onFetchPostsStart: func.isRequired,
    posts: object
};
