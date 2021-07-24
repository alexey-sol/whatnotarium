import {
    array,
    func,
    number,
    object
} from "prop-types";

import { DEFAULT_PAGING_COUNT } from "utils/const/defaultValues";

export const defaultProps = {
    currentUsersPage: 1,
    users: [],
    usersOnPageCount: DEFAULT_PAGING_COUNT
};

export const propTypes = {
    currentUsersPage: number,
    location: object.isRequired,
    onFetchUsersStart: func.isRequired,
    onSearchUsersStart: func.isRequired,
    onSetCurrentPage: func.isRequired,
    users: array,
    usersOnPageCount: number
};
