import { createSelector } from "reselect";

const getSupport = ({ support }) => support;

export const selectError = createSelector(
    [getSupport],
    ({ error }) => error
);
