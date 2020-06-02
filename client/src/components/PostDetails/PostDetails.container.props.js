import { func, object } from "prop-types";

export const defaultProps = {
    affectedPost: {},
    currentUser: null,
    fetchedPosts: {},
    post: null
};

export const propTypes = {
    affectedPost: object,
    currentUser: object,
    fetchedPosts: object,
    history: object,
    match: object.isRequired,
    onCreatePostReset: func.isRequired,
    onGetPost: func.isRequired,
    onUpdatePostReset: func.isRequired,
    post: object
};
