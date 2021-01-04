import {
    array,
    bool,
    func,
    number,
    object
} from "prop-types";

import { DEFAULT_PAGING_COUNT } from "utils/const/defaultValues";

export const defaultProps = {
    currentPostsPage: 1,
    isPending: false,
    posts: [],
    postsOnPageCount: DEFAULT_PAGING_COUNT,
    totalCount: 0
};

export const propTypes = {
    currentPostsPage: number,
    isPending: bool,
    location: object.isRequired,
    onFetchPostsStart: func.isRequired,
    posts: array,
    postsOnPageCount: number,
    totalCount: number
};
