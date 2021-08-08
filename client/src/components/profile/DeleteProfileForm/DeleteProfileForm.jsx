import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { USERS_PREFIX } from "utils/const/actionTypeAffixes";
import BaseButton from "components/ui/BaseButton";
import DeleteProfileDialog from "components/ui/Dialog/DeleteProfileDialog";
import { deleteUserStart } from "redux/users/users.actions";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectRelevantPendingAction } from "redux/ui/ui.selectors";
import { showNotification } from "redux/ui/ui.actions";
import styles from "./DeleteProfileForm.module.scss";

function DeleteProfileForm () {
    const [dialogIsShown, setDialogIsShown] = useState(false);

    return (
        <section className={styles.container}>
            <BaseButton
                onClick={() => setDialogIsShown(true)}
                text="Удалить учетную запись"
                theme="dark"
            />

            {dialogIsShown && (
                <DeleteProfileDialog onClose={() => setDialogIsShown(false)} />
            )}
        </section>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    isPending: (state) => Boolean(selectRelevantPendingAction(state, {
        actionPrefix: USERS_PREFIX
    }))
});

const mapDispatchToProps = (dispatch) => ({
    onDeleteUserStart: (props, cb) => dispatch(deleteUserStart(props, cb)),
    onShowNotification: (notification) => dispatch(showNotification(notification))
});

const ConnectedDeleteProfileForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteProfileForm);

export default ConnectedDeleteProfileForm;
