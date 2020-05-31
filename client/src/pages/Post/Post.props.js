import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    post: {},
    postError: null,
    updatedPost: null
};

export const propTypes = {
    currentUser: object,
    match: object.isRequired,
    onClearAllErrors: func.isRequired,
    onGetPostStart: func.isRequired,
    onUpdatePostReset: func.isRequired,
    post: object,
    postError: object,
    updatedPost: object
};
