import { func, object } from "prop-types";

export const defaultProps = {
    createdPost: null,
    createdPostError: null,
    createdPostPending: {},
    deletedPost: null,
    deletedPostError: null,
    deletedPostPending: {},
    gottenPostError: null,
    post: null,
    updatedPost: null,
    updatedPostError: null,
    updatedPostPending: null
};

export const propTypes = {
    createdPost: object,
    createdPostError: object,
    createdPostPending: object,
    currentUser: object.isRequired,
    deletedPost: object,
    deletedPostError: object,
    deletedPostPending: object,
    gottenPostError: object,
    history: object.isRequired,
    match: object.isRequired,
    onClearAllErrors: func.isRequired,
    onCreatePostStart: func.isRequired,
    onDeletePostStart: func.isRequired,
    onGetPostStart: func.isRequired,
    onUpdatePostStart: func.isRequired,
    post: object,
    updatedPost: object,
    updatedPostError: object,
    updatedPostPending: object
};
