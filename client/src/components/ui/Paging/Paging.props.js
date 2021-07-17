import {
    func,
    number,
    object,
    string
} from "prop-types";

import { DEFAULT_PAGE_NEIGHBOURS, DEFAULT_PAGING_COUNT } from "utils/const/defaultValues";

export const defaultProps = {
    count: DEFAULT_PAGING_COUNT,
    currentPage: 1,
    pageNeighbours: DEFAULT_PAGE_NEIGHBOURS,
    pathPrefix: "",
    qs: ""
};

export const propTypes = {
    count: number,
    currentPage: number,
    history: object.isRequired,
    pageNeighbours: number,
    pathPrefix: string,
    qs: string,
    setCurrentPage: func.isRequired,
    totalRecords: number.isRequired
};
