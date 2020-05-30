import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    deletedPost: null,
    deletedPostError: null,
    post: {},
    updatedPost: null,
    updatedPostError: null
};

export const propTypes = {
    currentUser: object,
    deletedPost: object,
    deletedPostError: object,
    match: object.isRequired,
    onDeletePostReset: func.isRequired,
    onGetPostStart: func.isRequired,
    onUpdatePostReset: func.isRequired,
    post: object,
    updatedPost: object,
    updatedPostError: object
};
