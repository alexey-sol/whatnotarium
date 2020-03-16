import { createSelector } from "reselect";

const selectUser = ({ user }) => user;

const selectCurrentUser = createSelector(
    [selectUser],
    ({ currentUser }) => currentUser
);

const selectUserError = createSelector(
    [selectUser],
    ({ error }) => error
);

export {
    selectCurrentUser,
    selectUserError
};
