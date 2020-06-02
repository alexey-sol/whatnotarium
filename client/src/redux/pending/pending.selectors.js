import { createSelector } from "reselect";

import getActionNames from "utils/redux/getActionNames";
import postTypes from "../post/post.types";
import userTypes from "../user/user.types";

const {
    CREATE_POST,
    DELETE_POST,
    FETCH_POST,
    FETCH_POSTS,
    UPDATE_POST
} = getActionNames(postTypes);

const {
    UPDATE_PROFILE
} = getActionNames(userTypes);

const getPending = ({ pending }) => pending;

export const selectCreatedPostPending = createSelector(
    [getPending],
    ({ [CREATE_POST]: result }) => result
);

export const selectDeletedPostPending = createSelector(
    [getPending],
    ({ [DELETE_POST]: result }) => result
);

export const selectFetchedPostPending = createSelector(
    [getPending],
    ({ [FETCH_POST]: result }) => result
);

export const selectFetchedPostsPending = createSelector(
    [getPending],
    ({ [FETCH_POSTS]: result }) => result
);

export const selectUpdatedPostPending = createSelector(
    [getPending],
    ({ [UPDATE_POST]: result }) => result
);

export const selectUpdatedProfilePending = createSelector(
    [getPending],
    ({ [UPDATE_PROFILE]: result }) => result
);
