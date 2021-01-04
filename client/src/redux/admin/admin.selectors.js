import { createSelector } from "reselect";

const getAdmin = ({ admin }) => admin;

export const selectError = createSelector(
    [getAdmin],
    ({ error }) => error
);
