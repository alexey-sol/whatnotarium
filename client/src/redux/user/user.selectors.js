import { createSelector } from "reselect";

const getUser = ({ user }) => user;

const selectCurrentUser = createSelector(
    [getUser],
    ({ currentUser }) => currentUser
);

const selectUserError = createSelector(
    [getUser],
    ({ error }) => error
);

export {
    selectCurrentUser,
    selectUserError
};
