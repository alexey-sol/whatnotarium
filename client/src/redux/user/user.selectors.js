import { createSelector } from "reselect";

const getUser = ({ user }) => user;

export const selectUpdatedProfile = createSelector(
    [getUser],
    ({ updatedProfile }) => updatedProfile
);
