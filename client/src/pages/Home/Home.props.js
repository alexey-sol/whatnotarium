import { array, bool, func } from "prop-types";

export const defaultProps = {
    isPending: false,
    posts: {}
};

export const propTypes = {
    isPending: bool,
    onFetchPostsStart: func.isRequired,
    posts: array
};
