import { func, object } from "prop-types";

export const defaultProps = {
    createdPost: {},
    currentUser: null,
    fetchedPosts: {},
    post: null,
    updatedPost: {}
};

export const propTypes = {
    createdPost: object,
    currentUser: object,
    fetchedPosts: object,
    history: object,
    match: object.isRequired,
    onCreatePostReset: func.isRequired,
    onGetPost: func.isRequired,
    onUpdatePostReset: func.isRequired,
    post: object,
    updatedPost: object
};
