import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
    SearchIconButton,
    UserIconButton
} from "components/common/IconButton";

import { SignInDialog, SignUpDialog } from "components/common/Dialog";
import { UserMenuDropdown } from "components/common/Dropdown";
import { propTypes } from "./ActionsMenu.props";
import { selectCurrentUser } from "redux/user/user.selectors";
import styles from "./ActionsMenu.module.scss";

ActionsMenu.propTypes = propTypes;

function ActionsMenu ({ currentUser }) {
    const [signInDialogIsShown, setSignInDialogIsShown] = useState(false);
    const [signUpDialogIsShown, setSignUpDialogIsShown] = useState(false);
    const [userMenuDropdownIsShown, setUserMenuDropdownIsShown] =
        useState(false);

    const userIconButtonRef = useRef(null);

    const showSignInDialog = useCallback(() => {
        setSignInDialogIsShown(true);
    }, [currentUser]);

    const showUserMenuDropdown = useCallback(() => {
        setUserMenuDropdownIsShown(true);
    }, [currentUser]);

    const handleClickOnUserButton = (currentUser)
        ? showUserMenuDropdown
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
                <SearchIconButton
                    className={styles.iconButton}
                    onClick={() => console.log("Click on search icon")}
                />

                <span ref={userIconButtonRef}>
                    <UserIconButton
                        className={styles.iconButton}
                        onClick={handleClickOnUserButton}
                    />
                </span>
            </div>

            {signInDialogIsShown && <SignInDialog
                onClose={() => setSignInDialogIsShown(false)}
                showSignUpDialog={() => setSignUpDialogIsShown(true)}
            />}

            {signUpDialogIsShown && <SignUpDialog
                onClose={() => setSignUpDialogIsShown(false)}
            />}

            {userMenuDropdownIsShown && <UserMenuDropdown
                elementRef={userIconButtonRef}
                onClose={() => setUserMenuDropdownIsShown(false)}
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
