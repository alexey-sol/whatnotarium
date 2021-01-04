import {
    array,
    func,
    number,
    object
} from "prop-types";

import { DEFAULT_PAGING_COUNT } from "utils/const/defaultValues";

export const defaultProps = {
    currentPage: 1,
    posts: [],
    postsOnPageCount: DEFAULT_PAGING_COUNT
};

export const propTypes = {
    currentPage: number,
    location: object.isRequired,
    onSetCurrentPage: func.isRequired,
    posts: array,
    postsOnPageCount: number
};
