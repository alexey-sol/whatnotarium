import { func, object } from "prop-types";

export const defaultProps = {
    createdPost: null,
    deletedPost: null,
    fetchedPosts: {},
    post: null,
    updatedPost: null
};

export const propTypes = {
    createdPost: object,
    currentUser: object.isRequired,
    deletedPost: object,
    fetchedPosts: object,
    history: object.isRequired,
    match: object.isRequired,
    onCreatePostReset: func.isRequired,
    onCreatePostStart: func.isRequired,
    onDeletePostReset: func.isRequired,
    onDeletePostStart: func.isRequired,
    onGetPost: func.isRequired,
    onUpdatePostReset: func.isRequired,
    onUpdatePostStart: func.isRequired,
    post: object,
    updatedPost: object
};
