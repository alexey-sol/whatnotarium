import React, {
    createContext,
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
    BookmarkIconButton,
    NotificationIconButton,
    SearchIconButton,
    UserIconButton
} from "components/IconButton";

import { SignInDialog, SignUpDialog } from "components/Dialog";
import { defaultProps, propTypes } from "./ActionsMenu.props";
import { selectCurrentUser } from "redux/user/user.selectors";
import styles from "./ActionsMenu.module.scss";

export const SignInContext = createContext({});
// TODO: still doesn't work

ActionsMenu.defaultProps = defaultProps;
ActionsMenu.propTypes = propTypes;

function ActionsMenu ({ currentUser, showUserMenu }) {
    const [signInIsShown, setSignInIsShown] = useState(false);
    const [signUpIsShown, setSignUpIsShown] = useState(false);

    const userIconButtonRef = useRef(null);
    const showSignInDialog = useCallback(() => setSignInIsShown(true), []);

    const handleClickOnUserButton = (currentUser)
        ? showUserMenu
        : showSignInDialog;

    const hideSignIn = useCallback(() => setSignInIsShown(false), []);
    const hideSignUp = useCallback(() => setSignUpIsShown(false), []);
    const showSignUp = useCallback(() => setSignUpIsShown(true), []);

    useEffect(() => {
        const hasUser = currentUser?.id;

        const hideDialogs = () => {
            setSignInIsShown(false);
            setSignUpIsShown(false);
        };

        if (hasUser) {
            hideDialogs();
        }
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

                {currentUser && (
                    <span className={styles.iconButton}>
                        <BookmarkIconButton
                            className={styles.iconButton}
                            onClick={() => console.log("Click on bm icon")}
                        />
                    </span>
                )}

                {currentUser && (
                    <span className={styles.iconButton}>
                        <NotificationIconButton
                            className={styles.iconButton}
                            onClick={() => console.log("Click on notif icon")}
                        />
                    </span>
                )}

                <span
                    className={styles.iconButton}
                    ref={userIconButtonRef}
                >
                    <UserIconButton onClick={handleClickOnUserButton} />
                </span>
            </div>

            {signInIsShown && (
                <SignInContext.Provider
                    value={{
                        onClose: hideSignIn,
                        showSignUp
                    }}
                >
                    <SignInDialog onClose={hideSignIn} />
                </SignInContext.Provider>
            )}

            {signUpIsShown && (
                <SignUpDialog onClose={hideSignUp} />
            )}
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
