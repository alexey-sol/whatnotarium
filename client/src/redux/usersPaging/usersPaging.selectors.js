import { createSelector } from "reselect";

const getUsersPaging = ({ usersPaging }) => usersPaging;

export const selectCount = createSelector(
    [getUsersPaging],
    ({ count }) => count
);

export const selectCurrentPage = createSelector(
    [getUsersPaging],
    ({ currentPage }) => currentPage
);

export const selectTotalCount = createSelector(
    [getUsersPaging],
    ({ totalCount }) => totalCount
);
