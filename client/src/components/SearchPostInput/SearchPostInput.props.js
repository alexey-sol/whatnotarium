import { func, string } from "prop-types";

export const defaultProps = {
    rootClassName: ""
};

export const propTypes = {
    onSearchPostsStart: func.isRequired,
    rootClassName: string
};
