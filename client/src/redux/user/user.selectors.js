import { createSelector } from "reselect";

import types from "./user.types";

const {
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_SUCCESS
} = types;

const getUser = ({ user }) => user;

export const selectUpdatedProfile = createSelector(
    [getUser],
    ({ [UPDATE_PROFILE_SUCCESS]: result }) => result
);

export const selectUpdatedProfileError = createSelector(
    [getUser],
    ({ [UPDATE_PROFILE_FAILURE]: result }) => result
);
