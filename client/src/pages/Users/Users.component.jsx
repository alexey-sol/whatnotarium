import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";

import { USERS_PREFIX } from "utils/const/actionTypeAffixes";
import SearchUserInput from "components/SearchUserInput";
import UserList from "components/UserList";
import WithSpinner from "components/WithSpinner";
import { defaultProps, propTypes } from "./Users.props";
import { fetchUsersStart } from "redux/users/users.actions";
import { selectCount, selectCurrentPage } from "redux/usersPaging/usersPaging.selectors";
import { selectUsers } from "redux/users/users.selectors";
import { selectRelevantPendingAction } from "redux/ui/ui.selectors";

Users.defaultProps = defaultProps;
Users.propTypes = propTypes;

function Users ({
    currentUsersPage,
    isPending,
    match,
    onFetchUsersStart,
    users,
    usersOnPageCount
}) {
    const pageNumber = match.params.number || currentUsersPage;

    useEffect(() => {
        onFetchUsersStart({
            count: usersOnPageCount,
            page: pageNumber
        });
    }, [onFetchUsersStart, pageNumber, usersOnPageCount]);

    const propsFromUsers = { isPending, users };
    const UsersWithSpinner = WithSpinner(UserList, propsFromUsers);

    return (
        <Fragment>
            <SearchUserInput />
            <UsersWithSpinner />
        </Fragment>
    );
}

const mapStateToProps = () => {
    return (state) => ({
        currentUsersPage: selectCurrentPage(state),
        isPending: Boolean(selectRelevantPendingAction(state, USERS_PREFIX)),
        users: selectUsers(state),
        usersOnPageCount: selectCount(state)
    });
};

const mapDispatchToProps = (dispatch) => ({
    onFetchUsersStart: (options) => dispatch(fetchUsersStart(options))
});

const ConnectedUsers = connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);

export default ConnectedUsers;
