import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { PROFILE } from "utils/const/pathnames";
import BaseButton from "components/BaseButton";
import BaseDialog from "components/BaseDialog";
import NavbarList from "components/NavbarList";
import SearchPostInput from "components/SearchPostInput";
import { defaultProps, propTypes } from "./MobileActionsMenu.props";
import { signOutStart } from "redux/session/session.actions";
import styles from "./MobileActionsMenu.module.scss";

MobileActionsMenu.defaultProps = defaultProps;
MobileActionsMenu.propTypes = propTypes;

export function MobileActionsMenu ({
    currentUser,
    history,
    onClose,
    onSignOutStart,
    showSignIn
}) {
    const bindOnClose = (cb) => () => {
        cb();
        onClose();
    };

    const redirectToProfile = () => history.push(`/${PROFILE}`);

    const signOut = () => {
        onSignOutStart();
        onClose();
    };

    const authButton = (currentUser)
        ? (
            <div>
                <li><span onClick={bindOnClose(redirectToProfile)}>Профиль</span></li>
                <li><span onClick={bindOnClose(signOut)}>Выйти из аккаунта</span></li>
            </div>
        )
        : (
            <BaseButton
                onClick={bindOnClose(showSignIn)}
                text="Войти"
                width="full"
            />
        );

    return (
        <BaseDialog
            onClose={onClose}
            className={styles.container}
            width="fixed"
        >
            <ul className={styles.content}>
                <li className={styles.item}>
                    <SearchPostInput
                        hasManualEnter
                        onClose={onClose}
                        rootClassName={styles.searchInputContainer}
                    />
                </li>

                <li className={styles.item}>
                    {authButton}
                </li>

                <div className={styles.item}>
                    <div className={styles.mobileNavbar}>
                        <NavbarList onClose={onClose} />
                    </div>
                </div>

            </ul>
        </BaseDialog>
    );
}

const mapDispatchToProps = (dispatch) => ({
    onSignOutStart: () => dispatch(signOutStart())
});

const ConnectedMobileActionsMenu = connect(
    null,
    mapDispatchToProps
)(MobileActionsMenu);

export default withRouter(ConnectedMobileActionsMenu);
