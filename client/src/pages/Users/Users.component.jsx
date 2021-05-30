import React, {
    Fragment,
    useCallback,
    useEffect,
    useState
} from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { SEARCH_USERS } from "utils/const/events";
import { USERS_PREFIX } from "utils/const/actionTypeAffixes";
import QSParser from "utils/parsers/QSParser";
import SearchUserInput from "components/layout/SearchUserInput";
import UserList from "components/users/UserList";
import WithSpinner from "components/ui/WithSpinner";
import { defaultProps, propTypes } from "./Users.props";
import { fetchUsersStart, searchUsersStart } from "redux/users/users.actions";

import {
    selectCount,
    selectCurrentPage,
    selectTotalCount
} from "redux/usersPaging/usersPaging.selectors";

import { selectRelevantPendingAction } from "redux/ui/ui.selectors";
import { selectUsers } from "redux/users/users.selectors";
import getPathPrefix from "utils/helpers/getPathPrefix";
import pubsub from "utils/pubsub";

Users.defaultProps = defaultProps;
Users.propTypes = propTypes;

function Users ({
    currentUsersPage,
    isPending,
    location,
    match,
    onFetchUsersStart,
    onSearchUsersStart,
    totalCount,
    users,
    usersOnPageCount
}) {
    const locationKey = location.key;
    const pageNumber = match.params.number || currentUsersPage;

    const [searchTerm, setSearchTerm] = useState("");

    const qs = location.search;
    const qsParser = new QSParser(qs);
    const { st: stFromQuery } = qsParser.parse();

    const fetchUsers = useCallback(() => onFetchUsersStart({
        count: usersOnPageCount,
        page: pageNumber,
        where: { isAdmin: false, isConfirmed: true }
    }), [locationKey, onFetchUsersStart, pageNumber, usersOnPageCount]); // eslint-disable-line

    const searchUsers = useCallback(() => onSearchUsersStart({
        count: usersOnPageCount,
        page: pageNumber,
        searchTerm: stFromQuery
    }), [onSearchUsersStart, pageNumber, stFromQuery, usersOnPageCount]);

    useEffect(() => {
        if (stFromQuery) {
            searchUsers();
        } else {
            fetchUsers();
        }
    }, [fetchUsers, searchUsers, stFromQuery]);

    useEffect(() => {
        const setSt = (st) => setSearchTerm(st);
        pubsub.subscribe(SEARCH_USERS, setSt);
        return () => pubsub.unsubscribe(SEARCH_USERS, setSt);
    }, []);

    const propsFromUsers = {
        currentPage: +pageNumber,
        isPending,
        pathPrefix: getPathPrefix(location.pathname, 2),
        searchTerm: searchTerm || stFromQuery,
        totalCount,
        users
    };

    const UsersWithSpinner = WithSpinner(UserList, propsFromUsers);

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
    onSearchUsersStart: (options) => dispatch(searchUsersStart(options))
});

const ConnectedUsers = connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);

export default ConnectedUsers;
