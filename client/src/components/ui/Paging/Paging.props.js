import {
    func,
    number,
    object,
    string
} from "prop-types";

import { DEFAULT_PAGING_COUNT } from "utils/const/defaultValues";

export const defaultProps = {
    count: DEFAULT_PAGING_COUNT,
    currentPage: 1,
    pageNeighbours: 4,
    pathPrefix: "",
    query: ""
};

export const propTypes = {
    count: number,
    currentPage: number,
    history: object.isRequired,
    pageNeighbours: number,
    pathPrefix: string,
    query: string,
    setCurrentPage: func.isRequired,
    totalRecords: number.isRequired
};
