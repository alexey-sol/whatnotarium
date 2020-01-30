import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
    SearchIconButton,
    UserIconButton
} from "components/common/IconButton";

import { SignInDialog, SignUpDialog } from "components/common/Dialog";
import { propTypes } from "./ActionsMenu.props";
import { selectCurrentUser } from "redux/user/user.selectors";
import styles from "./ActionsMenu.module.scss";

ActionsMenu.propTypes = propTypes;

function ActionsMenu ({ currentUser }) {
    const [signInDialogIsShown, setSignInDialogIsShown] = useState(false);
    const [signUpDialogIsShown, setSignUpDialogIsShown] = useState(false);

    const showSignInDialog = useCallback(() => {
        setSignInDialogIsShown(true);
    }, [currentUser]);

    const handleClickOnUserButton = (currentUser)
        ? () => {}
        : showSignInDialog;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <SearchIconButton
                    className={styles.iconButton}
                    onClick={() => console.log("Click on search icon")}
                />

                <UserIconButton
                    className={styles.iconButton}
                    onClick={handleClickOnUserButton}
                />
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
