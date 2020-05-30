import { createSelector } from "reselect";

import types from "./post.types";

const getPost = ({ post }) => post;

const {
    CREATE_POST_FAILURE,
    CREATE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    DELETE_POST_SUCCESS,
    GET_POST_FAILURE,
    GET_POST_SUCCESS,
    GET_POSTS_FAILURE,
    GET_POSTS_SUCCESS,
    UPDATE_POST_FAILURE,
    UPDATE_POST_SUCCESS
} = types;

export const selectCreatedPost = createSelector(
    [getPost],
    ({ [CREATE_POST_SUCCESS]: result }) => result
);

export const selectCreatedPostError = createSelector(
    [getPost],
    ({ [CREATE_POST_FAILURE]: result }) => result
);

export const selectDeletedPost = createSelector(
    [getPost],
    ({ [DELETE_POST_SUCCESS]: result }) => result
);

export const selectDeletedPostError = createSelector(
    [getPost],
    ({ [DELETE_POST_FAILURE]: result }) => result
);

export const selectGottenPost = createSelector(
    [getPost],
    ({ [GET_POST_SUCCESS]: result }) => result
);

export const selectGottenPostError = createSelector(
    [getPost],
    ({ [GET_POST_FAILURE]: result }) => result
);

export const selectGottenPosts = createSelector(
    [getPost],
    ({ [GET_POSTS_SUCCESS]: result }) => result
);

export const selectGottenPostsError = createSelector(
    [getPost],
    ({ [GET_POSTS_FAILURE]: result }) => result
);

export const selectUpdatedPost = createSelector(
    [getPost],
    ({ [UPDATE_POST_SUCCESS]: result }) => result
);

export const selectUpdatedPostError = createSelector(
    [getPost],
    ({ [UPDATE_POST_FAILURE]: result }) => result
);
