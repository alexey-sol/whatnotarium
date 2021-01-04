import {
    array,
    bool,
    func,
    number
} from "prop-types";

import { DEFAULT_PAGING_COUNT } from "utils/const/defaultValues";

export const defaultProps = {
    currentPostsPage: 1,
    isPending: false,
    postsOnPageCount: DEFAULT_PAGING_COUNT,
    totalCount: 0,
    userPosts: []
};

export const propTypes = {
    currentPostsPage: number,
    isPending: bool,
    onFetchPostsStart: func.isRequired,
    postsOnPageCount: number,
    totalCount: number,
    userPosts: array
};
