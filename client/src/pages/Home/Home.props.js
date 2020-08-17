import { bool, func, object } from "prop-types";

export const defaultProps = {
    isPending: false,
    posts: {}
};

export const propTypes = {
    isPending: bool,
    onFetchPostsStart: func.isRequired,
    posts: object
};
