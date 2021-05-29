import {
    array,
    bool,
    func,
    number
} from "prop-types";

export const defaultProps = {
    currentPage: 1,
    hasSearchTerm: false,
    users: [],
    usersOnPageCount: 20
};

export const propTypes = {
    currentPage: number,
    hasSearchTerm: bool,
    onSetCurrentPage: func.isRequired,
    users: array,
    usersOnPageCount: number
};
