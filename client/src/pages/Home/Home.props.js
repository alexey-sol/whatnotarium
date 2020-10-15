import {
    array,
    bool,
    func,
    object,
    number
} from "prop-types";

import { DEFAULT_PAGING_COUNT } from "utils/const/defaultValues";

export const defaultProps = {
    currentPostsPage: 1,
    isPending: false,
    posts: {},
    postsOnPageCount: DEFAULT_PAGING_COUNT
};

export const propTypes = {
    currentPostsPage: number,
    isPending: bool,
    match: object.isRequired,
    onFetchPostsStart: func.isRequired,
    posts: array,
    postsOnPageCount: number
};
