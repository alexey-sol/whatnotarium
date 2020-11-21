import React, {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
    BookmarkIconButton,
    CancelIconButton,
    MenuIconButton,
    NotificationIconButton,
    SearchIconButton,
    UserIconButton
} from "components/IconButton";

import { SignInDialog, SignUpDialog } from "components/Dialog";
import MobileActionsMenu from "components/MobileActionsMenu";
import SearchPostInput from "components/SearchPostInput";
import { defaultProps, propTypes } from "./ActionsMenu.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import styles from "./ActionsMenu.module.scss";

ActionsMenu.defaultProps = defaultProps;
ActionsMenu.propTypes = propTypes;

export function ActionsMenu ({
    currentUser,
    initialSearchIsShown,
    initialSignInIsShown,
    initialSignUpIsShown,
    showUserMenu
}) {
    const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);
    const [searchIsShown, setSearchIsShown] = useState(initialSearchIsShown);
    const [signInIsShown, setSignInIsShown] = useState(initialSignInIsShown);
    const [signUpIsShown, setSignUpIsShown] = useState(initialSignUpIsShown);

    const userIconButtonRef = useRef(null);
    const showSignInDialog = useCallback(() => setSignInIsShown(true), []);

    const handleClickOnUserButton = (currentUser)
        ? showUserMenu
        : showSignInDialog;

    const hideSearchInput = useCallback(() => setSearchIsShown(false), []);
    const showSearchInput = useCallback(() => setSearchIsShown(true), []);
    const hideSignIn = useCallback(() => setSignInIsShown(false), []);
    const hideSignUp = useCallback(() => setSignUpIsShown(false), []);
    const showSignIn = useCallback(() => setSignInIsShown(true), []);
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

    const closeButtonElem = (
        <CancelIconButton
            className={styles.iconButton}
            onClick={hideSearchInput}
            title="Закрыть"
        />
    );

    const searchButtonElem = (
        <SearchIconButton
            className={styles.iconButton}
            onClick={showSearchInput}
        />
    );

    const toggleSearchInputElem = (searchIsShown)
        ? closeButtonElem
        : searchButtonElem;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <span className={styles.iconButton}>
                    {searchIsShown && (
                        <SearchPostInput
                            onClose={hideSearchInput}
                            rootClassName={styles.searchInputContainer}
                        />
                    )}

                    {toggleSearchInputElem}
                </span>

                {false && currentUser && (
                    <span className={styles.iconButton}>
                        <BookmarkIconButton
                            className={styles.iconButton}
                            onClick={() => console.log("Click on bm icon")}
                        />
                    </span>
                )}

                {false && currentUser && (
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

            <div className={styles.mobileContent}>
                <MenuIconButton
                    className={styles.menuButton}
                    onClick={() => setMobileMenuIsShown(true)}
                    theme="dark"
                />
            </div>

            {mobileMenuIsShown && (
                <MobileActionsMenu
                    currentUser={currentUser}
                    onClose={() => setMobileMenuIsShown(false)}
                    showSignIn={showSignIn}
                />
            )}

            {signInIsShown && (
                <SignInDialog
                    onClose={hideSignIn}
                    showSignUp={showSignUp}
                />
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
