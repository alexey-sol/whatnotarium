import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
    BookmarkIconButton,
    NotificationIconButton,
    SearchIconButton,
    UserIconButton
} from "components/common/IconButton";

import { SignInDialog, SignUpDialog } from "components/common/Dialog";
import { propTypes } from "./ActionsMenu.props";
import { selectCurrentUser } from "redux/user/user.selectors";
import styles from "./ActionsMenu.module.scss";

ActionsMenu.propTypes = propTypes;

function ActionsMenu ({ currentUser, showUserMenu }) {
    const [signInDialogIsShown, setSignInDialogIsShown] = useState(false);
    const [signUpDialogIsShown, setSignUpDialogIsShown] = useState(false);

    const userIconButtonRef = useRef(null);

    const showSignInDialog = useCallback(() => {
        setSignInDialogIsShown(true);
    }, [currentUser]);

    const handleClickOnUserButton = (currentUser)
        ? showUserMenu
        : showSignInDialog;

    const hideDialogs = () => {
        if (signInDialogIsShown) setSignInDialogIsShown(false);
        if (signUpDialogIsShown) setSignUpDialogIsShown(false);
    };

    useEffect(() => {
        if (currentUser) hideDialogs();
    }, [currentUser]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <span className={styles.iconButton}>
                    <SearchIconButton
                        className={styles.iconButton}
                        onClick={() => console.log("Click on search icon")}
                    />
                </span>

                <span className={styles.iconButton}>
                    <BookmarkIconButton
                        className={styles.iconButton}
                        onClick={() => console.log("Click on bookmark icon")}
                    />
                </span>

                <span className={styles.iconButton}>
                    <NotificationIconButton
                        className={styles.iconButton}
                        onClick={() => console.log("Click on notif icon")}
                    />
                </span>

                <span
                    className={styles.iconButton}
                    ref={userIconButtonRef}
                >
                    <UserIconButton onClick={handleClickOnUserButton} />
                </span>
            </div>

            {signInDialogIsShown && <SignInDialog
                onClose={() => setSignInDialogIsShown(false)}
                showSignUpDialog={() => setSignUpDialogIsShown(true)}
            />}

            {signUpDialogIsShown && <SignUpDialog
                onClose={() => setSignUpDialogIsShown(false)}
            />}
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const ConnectedActionsMenu = connect(
    mapStateToProps
)(ActionsMenu);

export default ConnectedActionsMenu;
