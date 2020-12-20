import { Form, Formik } from "formik";
import React, { useCallback } from "react";
import { connect } from "react-redux";

import { ABOUT, EMAIL, NAME } from "utils/const/userData";
import { DEFAULT_TIMEOUT_IN_MS, SUCCESS } from "utils/const/notificationProps";
import { HIDE_NOTIFICATION } from "utils/const/events";
import { USERS_PREFIX } from "utils/const/actionTypeAffixes";
import BaseButton from "components/BaseButton";
import FormInput from "../FormInput";
import FormTextarea from "../FormTextarea";
import Notification from "utils/objects/Notification";
import { defaultProps, propTypes } from "./ProfileDataForm.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectNotification, selectRelevantPendingAction } from "redux/ui/ui.selectors";
import { showNotification } from "redux/ui/ui.actions";
import { updateUserStart } from "redux/users/users.actions";
import phrases from "utils/resources/text/ru/commonPhrases";
import pubsub from "utils/pubsub";
import styles from "./ProfileDataForm.module.scss";
import updateUserSchema from "utils/validators/shemas/updateUser";

const successNotification = new Notification(phrases.done, SUCCESS, DEFAULT_TIMEOUT_IN_MS);

ProfileDataForm.defaultProps = defaultProps;
ProfileDataForm.propTypes = propTypes;

function ProfileDataForm ({
    currentUser,
    isPending,
    notification,
    onShowNotification,
    onUpdateUserStart
}) {
    const initialValues = {
        about: currentUser.profile.about,
        email: currentUser.email,
        id: currentUser.id,
        name: currentUser.profile.name
    };

    const showSuccess = useCallback(() => {
        onShowNotification(successNotification);
    }, [onShowNotification]);

    const handleChangeWrapper = (event, cb) => {
        if (notification) {
            pubsub.publish(HIDE_NOTIFICATION);
        }

        cb(event);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={props => onUpdateUserStart(props, showSuccess)}
            validateOnChange
            validationSchema={updateUserSchema}
        >
            {({ errors, handleChange }) => (
                <Form className={styles.container}>
                    <FormInput
                        label="Имя"
                        name={NAME}
                        onChange={event => handleChangeWrapper(event, handleChange)}
                        type="text"
                    />

                    <FormInput
                        hasFixedTooltip
                        label="Email"
                        name={EMAIL}
                        onChange={event => handleChangeWrapper(event, handleChange)}
                        type="email"
                    />

                    <FormTextarea
                        label="О себе"
                        name={ABOUT}
                        onChange={event => handleChangeWrapper(event, handleChange)}
                    />

                    <BaseButton
                        className={styles.updateUserDataButton}
                        disabled={isPending || Object.keys(errors).length > 0}
                        text="Сохранить"
                        theme="dark"
                    />
                </Form>
            )}
        </Formik>
    );
}

const mapStateToProps = () => {
    return (state) => ({
        currentUser: selectCurrentUser(state),
        isPending: Boolean(selectRelevantPendingAction(state, USERS_PREFIX)),
        notification: selectNotification(state)
    });
};

const mapDispatchToProps = (dispatch) => ({
    onShowNotification: (notification) => dispatch(showNotification(notification)),
    onUpdateUserStart: (props, cb) => dispatch(updateUserStart(props, cb))
});

const ConnectedProfileDataForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileDataForm);

export default ConnectedProfileDataForm;
