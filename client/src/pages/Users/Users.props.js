import {
    array,
    bool,
    func,
    number,
    object
} from "prop-types";

import { DEFAULT_PAGING_COUNT } from "utils/const/defaultValues";

export const defaultProps = {
    currentUsersPage: 1,
    isPending: false,
    users: [],
    usersOnPageCount: DEFAULT_PAGING_COUNT
};

export const propTypes = {
    currentUsersPage: number,
    isPending: bool,
    location: object.isRequired,
    match: object.isRequired,
    onFetchUsersStart: func.isRequired,
    users: array,
    usersOnPageCount: number
};
