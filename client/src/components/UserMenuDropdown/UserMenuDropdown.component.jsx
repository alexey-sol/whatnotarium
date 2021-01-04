import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { ACTIVITY, PROFILE } from "utils/const/pathnames";
import BaseDropdown from "components/BaseDropdown";
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
            history.push(`/${PROFILE}/${ACTIVITY}`);
        }

        onClose();
    };

    const signOut = () => {
        onSignOutStart();
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
    onSignOutStart: () => dispatch(signOutStart())
});

const ConnectedUserMenuDropdown = connect(
    null,
    mapDispatchToProps
)(UserMenuDropdown);

export default withRouter(ConnectedUserMenuDropdown);
