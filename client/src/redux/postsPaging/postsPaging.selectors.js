import { createSelector } from "reselect";

const getPostsPaging = ({ postsPaging }) => postsPaging;

export const selectCount = createSelector(
    [getPostsPaging],
    ({ count }) => count
);

export const selectCurrentPage = createSelector(
    [getPostsPaging],
    ({ currentPage }) => currentPage
);

export const selectTotalCount = createSelector(
    [getPostsPaging],
    ({ totalCount }) => totalCount
);
