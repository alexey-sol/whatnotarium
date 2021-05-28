import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { MY_POSTS, PROFILE } from "utils/const/pathnames";
import BaseDropdown from "components/ui/BaseDropdown";
import { propTypes } from "./UserMenuDropdown.props";
import { signOutStart } from "redux/session/session.actions";
import styles from "./UserMenuDropdown.module.scss";

UserMenuDropdown.propTypes = propTypes;

function UserMenuDropdown ({
    elemRef,
    history,
    location,
    onClose,
    onSignOutStart
}) {
    const redirectToProfile = () => {
        const shouldRedirectToProfile = !location.pathname.includes(`/${PROFILE}`);

        if (shouldRedirectToProfile) {
            history.push(`/${PROFILE}/${MY_POSTS}`);
        }

        onClose();
    };

    const signOut = () => {
        onSignOutStart(() => history.push("/"));
        onClose();
    };

    return (
        <BaseDropdown
            elemRef={elemRef}
            onClose={onClose}
            rootClassName={styles.dropdownContainer}
        >
            <ul className={styles.container}>
                <li><span onClick={redirectToProfile}>Профиль</span></li>
                <li><span onClick={signOut}>Выйти из аккаунта</span></li>
            </ul>
        </BaseDropdown>
    );
}

const mapDispatchToProps = (dispatch) => ({
    onSignOutStart: (cb) => dispatch(signOutStart(cb))
});

const ConnectedUserMenuDropdown = connect(
    null,
    mapDispatchToProps
)(UserMenuDropdown);

export default withRouter(ConnectedUserMenuDropdown);
