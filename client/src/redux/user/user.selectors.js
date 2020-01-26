import { createSelector } from "reselect";

const selectUser = ({ user }) => user;

const selectCurrentUser = createSelector(
    [selectUser],
    ({ currentUser }) => currentUser
);

export {
    selectCurrentUser
};
