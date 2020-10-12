import { func } from "prop-types";

export const defaultProps = {
    currentPostsPage: 1
};

export const propTypes = {
    onCheckSessionStart: func.isRequired,
    onFetchPostsStart: func.isRequired
};
