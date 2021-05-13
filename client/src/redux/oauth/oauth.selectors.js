import { createSelector } from "reselect";

const getOauth = ({ oauth }) => oauth;

export const selectError = createSelector(
    [getOauth],
    ({ error }) => error
);
