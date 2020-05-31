import { func, object } from "prop-types";

export const defaultProps = {
    createdPost: null,
    deletedPost: null
};

export const propTypes = {
    createdPost: object,
    deletedPost: object,
    onCreatePostReset: func.isRequired,
    onDeletePostReset: func.isRequired
};
