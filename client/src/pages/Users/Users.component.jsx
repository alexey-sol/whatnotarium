import React, { useEffect } from "react";
import { connect } from "react-redux";

import { POSTS_PREFIX } from "utils/const/actionTypeAffixes";
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

    const propsFromHome = {
        isPending,
        users
    };

    const HomeWithSpinner = WithSpinner(
        UserList,
        propsFromHome
    );

    return <HomeWithSpinner />;
}

const mapStateToProps = () => {
    return (state) => ({
        currentUsersPage: selectCurrentPage(state),
        isPending: Boolean(selectRelevantPendingAction(state, POSTS_PREFIX)),
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
