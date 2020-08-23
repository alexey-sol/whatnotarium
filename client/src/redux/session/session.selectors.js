import { createSelector } from "reselect";

const getSession = ({ session }) => session;

export const selectCurrentUser = createSelector(
    [getSession],
    ({ currentUser }) => currentUser
);
export const selectError = createSelector(
    [getSession],
    ({ error }) => error
);

export const selectIsPending = createSelector(
    [getSession],
    ({ isPending }) => isPending
);
