import { createSelector } from "reselect";

import getActionNames from "utils/redux/getActionNames";
import postTypes from "../post/post.types";
// import userTypes from "../user/user.types";

const {
    CREATE_POST,
    DELETE_POST,
    GET_POST,
    GET_POSTS,
    UPDATE_POST
} = getActionNames(postTypes);

const getPending = ({ pending }) => pending;

export const selectCreatedPost = createSelector(
    [getPending],
    ({ [CREATE_POST]: result }) => result
);

export const selectDeletedPost = createSelector(
    [getPending],
    ({ [DELETE_POST]: result }) => result
);

export const selectGottenPost = createSelector(
    [getPending],
    ({ [GET_POST]: result }) => result
);

export const selectGottenPosts = createSelector(
    [getPending],
    ({ [GET_POSTS]: result }) => result
);

export const selectUpdatedPost = createSelector(
    [getPending],
    ({ [UPDATE_POST]: result }) => result
);
