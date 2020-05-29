import { func, object } from "prop-types";

export const defaultProps = {
    post: null,
    postError: null
};

export const propTypes = {
    currentUser: object.isRequired,
    history: object.isRequired,
    match: object.isRequired,
    onCreatePostStart: func.isRequired,
    onGetPostStart: func.isRequired,
    onResetPost: func.isRequired,
    onUpdatePostStart: func.isRequired,
    post: object,
    postError: object
};
