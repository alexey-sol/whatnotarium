import { array, func, number } from "prop-types";

import { DEFAULT_PAGING_COUNT } from "utils/const/defaultValues";

export const defaultProps = {
    currentPage: 1,
    posts: [],
    postsOnPageCount: DEFAULT_PAGING_COUNT,
    totalCount: 0
};

export const propTypes = {
    currentPage: number,
    onSetCurrentPage: func.isRequired,
    posts: array,
    postsOnPageCount: number,
    totalCount: number
};
