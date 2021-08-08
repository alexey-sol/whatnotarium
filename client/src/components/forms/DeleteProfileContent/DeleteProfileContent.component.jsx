import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router";

import { DEFAULT_TIMEOUT_IN_MS, SUCCESS } from "utils/const/notificationProps";
import { USERS_PREFIX } from "utils/const/actionTypeAffixes";
import BaseButton from "components/ui/BaseButton";
import Notification from "utils/objects/Notification";
import { defaultProps, propTypes } from "./DeleteProfileContent.props";
import { deleteUserStart } from "redux/users/users.actions";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectRelevantPendingAction } from "redux/ui/ui.selectors";
import { showNotification } from "redux/ui/ui.actions";
import styles from "./DeleteProfileContent.module.scss";

const ACCOUNT_DELETED = "Учетная запись удалена";
const notif = new Notification(ACCOUNT_DELETED, SUCCESS, DEFAULT_TIMEOUT_IN_MS);

DeleteProfileContent.defaultProps = defaultProps;
DeleteProfileContent.propTypes = propTypes;

function DeleteProfileContent ({
    currentUser,
    history,
    isPending,
    onClose,
    onDeleteUserStart,
    onShowNotification
}) {
    const redirectToHome = () => history.push("/");

    const deleteUserAndRedirectToHome = () => {
        if (!currentUser) return;

        onDeleteUserStart(currentUser.id, () => {
            onClose();
            redirectToHome();
            onShowNotification(notif);
        });
    };

    return (
        <section className={styles.container}>
            <p>
                Удалив учетную запись, вы не сможете ее восстановить. Кроме того, будут
                удалены все ваши статьи и оценки. Продолжить?
            </p>

            <div className={styles.buttons}>
                <BaseButton
                    disabled={isPending}
                    onClick={onClose}
                    text="Не надо"
                />

                <BaseButton
                    disabled={isPending}
                    onClick={deleteUserAndRedirectToHome}
                    text="Все равно удалить"
                    theme="dark"
                />
            </div>
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
    onDeleteUserStart: (id, cb) => dispatch(deleteUserStart(id, cb)),
    onShowNotification: (notification) => dispatch(showNotification(notification))
});

const ConnectedDeleteProfileContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteProfileContent);

export default withRouter(ConnectedDeleteProfileContent);
