import { createSelector } from "reselect";

const getUi = ({ ui }) => ui;

export const selectNotification = createSelector(
    [getUi],
    ({ notification }) => notification
);
