import { func, number } from "prop-types";

import { DEFAULT_PAGING_COUNT } from "utils/const/defaultValues";

export const defaultProps = {
    postsOnPageCount: DEFAULT_PAGING_COUNT
};

export const propTypes = {
    onFetchPostsStart: func.isRequired,
    postsOnPageCount: number
};
