import { func, object } from "prop-types";

export const defaultProps = {
    gottenPostError: null,
    post: null,
    updatedPostError: null
};

export const propTypes = {
    currentUser: object.isRequired,
    gottenPostError: object,
    history: object.isRequired,
    match: object.isRequired,
    onCreatePostStart: func.isRequired,
    onGetPostStart: func.isRequired,
    onUpdatePostReset: func.isRequired,
    onUpdatePostStart: func.isRequired,
    post: object,
    updatedPostError: object
};
