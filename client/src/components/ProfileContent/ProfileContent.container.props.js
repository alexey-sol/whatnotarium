import { func, object } from "prop-types";

export const defaultProps = {
    deletedPost: {}
};

export const propTypes = {
    deletedPost: object,
    onDeletePostReset: func.isRequired
};
