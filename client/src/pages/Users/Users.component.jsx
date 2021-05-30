import React, { Fragment, useCallback } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { SEARCH_USERS } from "utils/const/events";
import { USERS_PREFIX } from "utils/const/actionTypeAffixes";
import SearchUserInput from "components/layout/SearchUserInput";
import UserList from "components/users/UserList";
import WithSpinner from "components/ui/WithSpinner";
import { defaultProps, propTypes } from "./Users.props";
import { fetchUsersStart, searchUsersStart } from "redux/users/users.actions";
import { setCurrentPage } from "redux/usersPaging/usersPaging.actions";

import {
    selectCount,
    selectCurrentPage,
    selectTotalCount
} from "redux/usersPaging/usersPaging.selectors";

import { selectRelevantPendingAction } from "redux/ui/ui.selectors";
import { selectUsers } from "redux/users/users.selectors";
import getPathPrefix from "utils/helpers/getPathPrefix";
import usePagination from "utils/hooks/usePagination";

Users.defaultProps = defaultProps;
Users.propTypes = propTypes;

function Users ({
    currentUsersPage,
    isPending,
    location,
    onFetchUsersStart,
    onSearchUsersStart,
    onSetCurrentPage,
    totalCount,
    users,
    usersOnPageCount
}) {
    const locationKey = location.key;

    const fetchUsers = useCallback(({ page }) => onFetchUsersStart({
        count: usersOnPageCount,
        page,
        where: { isAdmin: false, isConfirmed: true }
    }), [locationKey, onFetchUsersStart, usersOnPageCount]); // eslint-disable-line

    const searchUsers = useCallback(({ page, searchTerm }) => onSearchUsersStart({
        count: usersOnPageCount,
        page,
        searchTerm
    }), [onSearchUsersStart, usersOnPageCount]);

    const { qs } = usePagination({
        currentPage: currentUsersPage,
        fetchRecords: fetchUsers,
        onSetCurrentPage,
        searchEventName: SEARCH_USERS,
        searchRecords: searchUsers
    });

    const UsersWithSpinner = WithSpinner(UserList, {
        isPending,
        pathPrefix: getPathPrefix(location.pathname, 2),
        qs,
        totalCount,
        users
    });

    return (
        <Fragment>
            <SearchUserInput />
            <UsersWithSpinner />
        </Fragment>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUsersPage: selectCurrentPage,
    isPending: (state) => Boolean(selectRelevantPendingAction(state, {
        actionPrefix: USERS_PREFIX
    })),
    totalCount: selectTotalCount,
    users: selectUsers,
    usersOnPageCount: selectCount
});

const mapDispatchToProps = (dispatch) => ({
    onFetchUsersStart: (options) => dispatch(fetchUsersStart(options)),
    onSearchUsersStart: (options) => dispatch(searchUsersStart(options)),
    onSetCurrentPage: (page) => dispatch(setCurrentPage(page))
});

const ConnectedUsers = connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);

export default ConnectedUsers;
