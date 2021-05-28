import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { USERS_PREFIX } from "utils/const/actionTypeAffixes";
import SearchUserInput from "components/layout/SearchUserInput";
import UserList from "components/users/UserList";
import WithSpinner from "components/ui/WithSpinner";
import { defaultProps, propTypes } from "./Users.props";
import { fetchUsersStart } from "redux/users/users.actions";
import { selectUsers } from "redux/users/users.selectors";
import { selectCount, selectCurrentPage } from "redux/usersPaging/usersPaging.selectors";
import { selectRelevantPendingAction } from "redux/ui/ui.selectors";

Users.defaultProps = defaultProps;
Users.propTypes = propTypes;

function Users ({
    currentUsersPage,
    isPending,
    location,
    match,
    onFetchUsersStart,
    users,
    usersOnPageCount
}) {
    const locationKey = location.key;
    const pageNumber = match.params.number || currentUsersPage;

    useEffect(() => {
        onFetchUsersStart({
            count: usersOnPageCount,
            page: pageNumber,
            where: { isAdmin: false, isConfirmed: true }
        });
    }, [locationKey, onFetchUsersStart, pageNumber, usersOnPageCount]);

    const propsFromUsers = { isPending, users };
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
    users: selectUsers,
    usersOnPageCount: selectCount
});

const mapDispatchToProps = (dispatch) => ({
    onFetchUsersStart: (options) => dispatch(fetchUsersStart(options))
});

const ConnectedUsers = connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);

export default ConnectedUsers;
