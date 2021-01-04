import { createSelector } from "reselect";

const getPosts = ({ posts }) => posts;
const getPostId = (state, postId) => postId;

export const selectError = createSelector(
    [getPosts],
    ({ error }) => error
);

export const selectPostById = createSelector(
    [getPosts, getPostId],
    ({ items }, postId) => {
        return items.get(postId);
    }
);

export const selectPosts = createSelector(
    [getPosts],
    ({ items }) => (items?.size > 0)
        ? [...items.values()]
        : []
);
