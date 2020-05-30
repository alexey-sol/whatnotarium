import { func, object } from "prop-types";

export const defaultProps = {
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
    deletedPost: object,
    deletedPostError: object,
    deletedPostPending: object,
    gottenPostError: object,
    history: object.isRequired,
    match: object.isRequired,
    onCreatePostStart: func.isRequired,
    onDeletePostStart: func.isRequired,
    onGetPostStart: func.isRequired,
    onUpdatePostStart: func.isRequired,
    post: object,
    updatedPost: object,
    updatedPostError: object,
    updatedPostPending: object
};
