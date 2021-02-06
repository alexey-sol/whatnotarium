import {
    array,
    func,
    number,
    object
} from "prop-types";

import { DEFAULT_PAGING_COUNT } from "utils/const/defaultValues";

export const defaultProps = {
    currentPostsPage: 1,
    currentUser: null,
    posts: [],
    postsOnPageCount: DEFAULT_PAGING_COUNT,
    totalCount: 0
};

export const propTypes = {
    currentPostsPage: number,
    currentUser: object,
    location: object.isRequired,
    match: object.isRequired,
    onFetchPostsStart: func.isRequired,
    posts: array,
    postsOnPageCount: number,
    totalCount: number
};
