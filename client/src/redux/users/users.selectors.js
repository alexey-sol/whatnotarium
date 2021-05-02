import { createSelector } from "reselect";

const getUsers = ({ users }) => users;
const getUserId = (state, userId) => userId;

export const selectError = createSelector(
    [getUsers],
    ({ error }) => error
);

export const selectUserById = createSelector(
    [getUsers, getUserId],
    ({ items }, userId) => {
        return items.get(userId);
    }
);

export const selectUsers = createSelector(
    [getUsers],
    ({ items }) => (items?.size > 0)
        ? [...items.values()]
        : []
);

export const selectTotalCount = createSelector(
    [getUsers],
    ({ totalCount }) => totalCount
);
