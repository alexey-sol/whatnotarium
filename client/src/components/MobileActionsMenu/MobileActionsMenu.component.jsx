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
    const bindClose = (cb) => () => {
        cb();
        onClose();
    };

    const redirectToProfile = () => history.push(`/${PROFILE}`);

    const signOut = () => {
        onSignOutStart(() => history.push("/"));
        onClose();
    };

    const renderProfileButtons = () => (
        <div className={styles.profileButtons}>
            <BaseButton
                onClick={bindClose(redirectToProfile)}
                text="Профиль"
                width="full"
            />

            <BaseButton
                onClick={bindClose(signOut)}
                text="Выйти из аккаунта"
                theme="dark"
                width="full"
            />
        </div>
    );

    const renderSignInButton = () => (
        <li className={styles.item}>
            <BaseButton
                onClick={bindClose(showSignIn)}
                text="Войти"
                width="full"
            />
        </li>
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

                {(currentUser)
                    ? renderProfileButtons()
                    : renderSignInButton()}

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
    onSignOutStart: (cb) => dispatch(signOutStart(cb))
});

const ConnectedMobileActionsMenu = connect(
    null,
    mapDispatchToProps
)(MobileActionsMenu);

export default withRouter(ConnectedMobileActionsMenu);
