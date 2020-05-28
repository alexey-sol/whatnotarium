import { createSelector } from "reselect";

const getPost = ({ post }) => post;

const selectPost = createSelector(
    [getPost],
    ({ post }) => post
);

const selectPosts = createSelector(
    [getPost],
    ({ posts }) => posts
);

const selectPostError = createSelector(
    [getPost],
    ({ error }) => error
);

export {
    selectPost,
    selectPostError,
    selectPosts
};
