import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: {},
    post: {},
    postError: null
};

export const propTypes = {
    currentUser: object,
    match: object.isRequired,
    onCreatePostStart: func.isRequired,
    onGetPostStart: func.isRequired,
    post: object,
    postError: object
};
