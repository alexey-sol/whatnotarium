import { func, number } from "prop-types";

import { DEFAULT_PAGING_COUNT } from "utils/const/defaultValues";

export const defaultProps = {
    count: DEFAULT_PAGING_COUNT,
    currentPage: 1,
    pageNeighbours: 4
};

export const propTypes = {
    count: number,
    currentPage: number,
    onChangePage: func.isRequired,
    pageNeighbours: number,
    totalRecords: number.isRequired
};
