import { createSelector } from "reselect";

const getPost = ({ post }) => post;

export const selectCreatedPost = createSelector(
    [getPost],
    ({ createdPost }) => createdPost
);

export const selectDeletedPost = createSelector(
    [getPost],
    ({ deletedPost }) => deletedPost
);

export const selectFetchedPost = createSelector(
    [getPost],
    ({ fetchedPost }) => fetchedPost
);

export const selectFetchedPosts = createSelector(
    [getPost],
    ({ fetchedPosts }) => fetchedPosts
);

export const selectPost = createSelector(
    [getPost],
    ({ post }) => post
);

export const selectPosts = createSelector(
    [getPost],
    ({ posts }) => posts
);

export const selectUpdatedPost = createSelector(
    [getPost],
    ({ updatedPost }) => updatedPost
);
