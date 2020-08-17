import { createSelector } from "reselect";

const getUi = ({ ui }) => ui;

export const selectIsPending = createSelector(
    [getUi],
    ({ isPending }) => isPending
);

export const selectNotification = createSelector(
    [getUi],
    ({ notification }) => notification
);
