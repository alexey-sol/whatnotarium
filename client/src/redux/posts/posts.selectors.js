import { createSelector } from "reselect";

const getPosts = ({ posts }) => posts;
const getPostId = (state, postId) => postId;

export const selectError = createSelector(
    [getPosts],
    ({ error }) => error
);

export const selectPostById = createSelector(
    [getPosts, getPostId],
    ({ items }, postId) => items[postId]
);

export const selectPosts = createSelector(
    [getPosts],
    ({ items }) => items
);

export const selectTotalCount = createSelector(
    [getPosts],
    ({ totalCount }) => totalCount
);
