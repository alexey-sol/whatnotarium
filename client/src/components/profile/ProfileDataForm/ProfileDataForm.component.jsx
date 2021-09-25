import { Form, Formik } from "formik";
import React, { useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router";

import * as p from "utils/const/pathnames";
import { ABOUT, EMAIL, NAME } from "utils/const/userData";
import { DEFAULT_TIMEOUT_IN_MS, SUCCESS } from "utils/const/notificationProps";
import { HIDE_NOTIFICATION } from "utils/const/events";
import { USERS_PREFIX } from "utils/const/actionTypeAffixes";
import BaseButton from "components/ui/BaseButton";
import FormInput from "components/forms/FormInput";
import FormTextarea from "components/forms/FormTextarea";
import Notification from "utils/objects/Notification";
import Tooltip from "components/ui/Tooltip";
import { defaultProps, propTypes } from "./ProfileDataForm.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectNotification, selectRelevantPendingAction } from "redux/ui/ui.selectors";
import { showNotification } from "redux/ui/ui.actions";
import { signOutStart } from "redux/session/session.actions";
import { updateUserStart } from "redux/users/users.actions";
import phrases from "utils/resources/text/ru/commonPhrases";
import pubsub from "utils/pubsub";
import styles from "./ProfileDataForm.module.scss";
import updateUserSchema from "utils/validators/schemas/updateUser";

const successNotification = new Notification(phrases.done, SUCCESS, DEFAULT_TIMEOUT_IN_MS);

ProfileDataForm.defaultProps = defaultProps;
ProfileDataForm.propTypes = propTypes;

function ProfileDataForm ({
    currentUser,
    history,
    isPending,
    notification,
    onShowNotification,
    onSignOutStart,
    onUpdateUserStart
}) {
    const emailInputRef = useRef(null);

    if (!currentUser) {
        return null;
    }

    const initialValues = {
        about: currentUser.profile.about,
        email: currentUser.email,
        id: currentUser.id,
        name: currentUser.profile.name
    };

    const showSuccess = () => onShowNotification(successNotification);

    const handleChangeWrapper = (event, cb) => {
        if (notification) {
            pubsub.publish(HIDE_NOTIFICATION);
        }

        cb(event);
    };

    const handleSubmit = (props) => {
        const signOutAndRedirectToSupportIfNeeded = () => {
            const { email } = props;
            const emailChanged = email !== currentUser.email;

            if (emailChanged) {
                onSignOutStart(
                    () => history.push(`/${p.SUPPORT}/${p.CONFIRM}/${p.EMAIL}/${email}`)
                );
            }
        };

        onUpdateUserStart(props, () => {
            showSuccess();
            signOutAndRedirectToSupportIfNeeded();
        });
    };

    const { hasPassword, isAdmin } = currentUser;

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validateOnChange
            validationSchema={updateUserSchema}
        >
            {({ errors, handleChange }) => (
                <Form className={styles.container}>
                    {isAdmin && (
                        <div className={styles.isAdminLabel}>Администратор</div>
                    )}

                    <FormInput
                        label="Имя"
                        maxLength="100"
                        name={NAME}
                        onChange={event => handleChangeWrapper(event, handleChange)}
                        type="text"
                    />

                    <div ref={emailInputRef}>
                        <FormInput
                            disabled={!hasPassword}
                            hasFixedTooltip
                            label="Email"
                            maxLength="100"
                            name={EMAIL}
                            onChange={event => handleChangeWrapper(event, handleChange)}
                            type="email"
                        />
                    </div>

                    <FormTextarea
                        label="О себе"
                        maxLength="200"
                        name={ABOUT}
                        onChange={event => handleChangeWrapper(event, handleChange)}
                    />

                    <BaseButton
                        className={styles.updateUserDataButton}
                        disabled={isPending || Object.keys(errors).length > 0}
                        text="Сохранить"
                    />

                    {!hasPassword && (
                        <Tooltip
                            elemRef={emailInputRef}
                            text="Вы не можете изменить email, пока не зададите пароль"
                            width="large"
                        />
                    )}
                </Form>
            )}
        </Formik>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    isPending: (state) => Boolean(selectRelevantPendingAction(state, {
        actionPrefix: USERS_PREFIX
    })),
    notification: selectNotification
});

const mapDispatchToProps = (dispatch) => ({
    onShowNotification: (notification) => dispatch(showNotification(notification)),
    onSignOutStart: (cb) => dispatch(signOutStart(cb)),
    onUpdateUserStart: (props, cb) => dispatch(updateUserStart(props, cb))
});

const ConnectedProfileDataForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileDataForm);

export default withRouter(ConnectedProfileDataForm);
