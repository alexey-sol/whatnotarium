import React, {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
    CancelIconButton,
    MenuIconButton,
    SearchIconButton,
    UserIconButton
} from "components/ui/IconButton";

import { ForgotPasswordDialog, SignInDialog, SignUpDialog } from "components/ui/Dialog";
import MobileActionsMenu from "components/layout/MobileActionsMenu";
import SearchPostInput from "components/layout/SearchPostInput";
import UserPicture from "components/ui/UserPicture";
import { defaultProps, propTypes } from "./ActionsMenu.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import styles from "./ActionsMenu.module.scss";

ActionsMenu.defaultProps = defaultProps;
ActionsMenu.propTypes = propTypes;

export function ActionsMenu ({
    currentUser,
    initialForgotPassIsShown,
    initialSearchIsShown,
    initialSignInIsShown,
    initialSignUpIsShown,
    showUserMenu
}) {
    const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);
    const [forgotPassIsShown, setForgotPassIsShown] = useState(initialForgotPassIsShown);
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
    const showSignIn = useCallback(() => setSignInIsShown(true), []);
    const hideSignUp = useCallback(() => setSignUpIsShown(false), []);
    const showSignUp = useCallback(() => setSignUpIsShown(true), []);
    const hideForgotPass = useCallback(() => setForgotPassIsShown(false), []);
    const showForgotPass = useCallback(() => setForgotPassIsShown(true), []);

    const { name, picture } = currentUser?.profile || {};

    const renderUserPic = () => (
        <UserPicture
            name={name}
            onClick={handleClickOnUserButton}
            picture={picture}
            rootClassName={styles.userPic}
        />
    );

    const renderUnauthedUserButton = () => (
        <UserIconButton onClick={handleClickOnUserButton} />
    );

    useEffect(() => {
        const hasUser = currentUser?.id;

        const hideDialogs = () => {
            setSignInIsShown(false);
            setSignUpIsShown(false);
            setForgotPassIsShown(false);
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

                <span
                    className={styles.iconButton}
                    ref={userIconButtonRef}
                >
                    {(currentUser?.profile.picture)
                        ? renderUserPic()
                        : renderUnauthedUserButton()}
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
                    showForgotPass={showForgotPass}
                    showSignUp={showSignUp}
                />
            )}

            {signUpIsShown && (
                <SignUpDialog onClose={hideSignUp} />
            )}

            {forgotPassIsShown && (
                <ForgotPasswordDialog onClose={hideForgotPass} />
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
