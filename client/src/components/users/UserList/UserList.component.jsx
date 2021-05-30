import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router";

import Paging from "components/ui/Paging";
import UserPreview from "components/users/UserPreview";
import { defaultProps, propTypes } from "./UserList.props";
import { selectCount, selectCurrentPage } from "redux/usersPaging/usersPaging.selectors";
import { setCurrentPage } from "redux/usersPaging/usersPaging.actions";
import styles from "./UserList.module.scss";

UserList.defaultProps = defaultProps;
UserList.propTypes = propTypes;

function UserList ({
    currentPage,
    onSetCurrentPage,
    pathPrefix,
    qs,
    totalCount,
    users,
    usersOnPageCount
}) {
    const userElems = users.map(user => (
        <li
            className={styles.userItem}
            key={user.id}
        >
            <UserPreview {...user} />
        </li>
    ));

    return (
        <article className={styles.container}>
            {(users.length > 0)
                ? <ul className={styles.userList}>{userElems}</ul>
                : <div>Никого не нашли</div>}

            <div className={styles.pagingContainer}>
                <Paging
                    count={usersOnPageCount}
                    currentPage={currentPage}
                    qs={qs}
                    pathPrefix={pathPrefix}
                    setCurrentPage={onSetCurrentPage}
                    totalRecords={totalCount}
                />
            </div>
        </article>
    );
}

const mapStateToProps = createStructuredSelector({
    currentPage: selectCurrentPage,
    usersOnPageCount: selectCount
});

const mapDispatchToProps = (dispatch) => ({
    onSetCurrentPage: (page) => dispatch(setCurrentPage(page))
});

const ConnectedPosts = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);

export default withRouter(ConnectedPosts);
