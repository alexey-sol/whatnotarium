import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { AuthDialog } from "components/common/Dialog";
import SearchButton from "components/SearchButton";
import UserButton from "components/UserButton";
import { propTypes } from "./ActionMenu.props";
import { selectCurrentUser } from "redux/user/user.selectors";
import styles from "./ActionMenu.module.scss";

ActionMenu.propTypes = propTypes;

function ActionMenu ({ currentUser }) {
    const [authDialogIsShown, setAuthDialogIsShown] = useState(false);

    const showAuthDialog = useCallback(() => {
        setAuthDialogIsShown(true);
    }, [currentUser]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <SearchButton
                    onClick={() => console.log("Click on search icon")}
                />

                <UserButton
                    onClick={currentUser ? () => {} : showAuthDialog}
                    currentUser={currentUser}
                />
            </div>

            {authDialogIsShown && <AuthDialog
                onClose={() => setAuthDialogIsShown(false)}
            />}
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const ConnectedAside = connect(
    mapStateToProps
)(ActionMenu);

export default ConnectedAside;
