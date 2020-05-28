import { array, func } from "prop-types";

export const defaultProps = {
    posts: []
};

export const propTypes = {
    onGetPostsStart: func.isRequired,
    posts: array
};
