import { Form, Formik } from "formik";
import React, { useCallback } from "react";
import { connect } from "react-redux";

import { CONFIRM_NEW_PASSWORD, NEW_PASSWORD, PASSWORD } from "utils/const/userData";
// import { PASSWORD_TOO_WEAK } from "utils/const/validationErrors";
import { DEFAULT_TIMEOUT_IN_MS, SUCCESS } from "utils/const/notificationProps";
import { HIDE_NOTIFICATION } from "utils/const/events";
import { USERS_PREFIX } from "utils/const/actionTypeAffixes";
import BaseButton from "components/BaseButton";
import FormInput from "components/FormInput";
import Notification from "utils/objects/Notification";
import { defaultProps, propTypes } from "./PasswordDataForm.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectNotification, selectRelevantPendingAction } from "redux/ui/ui.selectors";
import { showNotification } from "redux/ui/ui.actions";
import { updateUserStart } from "redux/users/users.actions";
// import hints from "utils/resources/text/ru/hints";
import phrases from "utils/resources/text/ru/commonPhrases";
import pubsub from "utils/pubsub";
import styles from "./PasswordDataForm.module.scss";
import updatePasswordSchema from "utils/validators/shemas/updatePassword";

const successNotification = new Notification(phrases.done, SUCCESS, DEFAULT_TIMEOUT_IN_MS);

PasswordDataForm.defaultProps = defaultProps;
PasswordDataForm.propTypes = propTypes;

function PasswordDataForm ({
    currentUser,
    isPending,
    notification,
    onShowNotification,
    onUpdateUserStart
}) {
    // const weakPasswordHint = (passwordErrorCode === PASSWORD_TOO_WEAK)
    //     ? hints.weakPassword
    //     : "";

    const initialValues = {
        confirmNewPassword: "",
        id: currentUser?.id,
        newPassword: "",
        password: ""
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
            validationSchema={updatePasswordSchema}
        >
            {({ errors, handleChange }) => (
                <Form className={styles.container}>
                    <FormInput
                        label="Текущий пароль"
                        name={PASSWORD}
                        onChange={event => handleChangeWrapper(event, handleChange)}
                        type="password"
                    />

                    <FormInput
                        label="Новый пароль"
                        name={NEW_PASSWORD}
                        onChange={event => handleChangeWrapper(event, handleChange)}
                        type="password"
                    />

                    <FormInput
                        label="Новый пароль еще раз"
                        name={CONFIRM_NEW_PASSWORD}
                        onChange={event => handleChangeWrapper(event, handleChange)}
                        type="password"
                    />

                    <BaseButton
                        className={styles.updatePasswordDataButton}
                        disabled={isPending || Object.keys(errors).length > 0}
                        text="Изменить пароль"
                    />
                </Form>
            )}
        </Formik>
    );
}

const mapStateToProps = () => {
    return (state) => ({
        currentUser: selectCurrentUser(state),
        isPending: Boolean(selectRelevantPendingAction(state, { actionPrefix: USERS_PREFIX })),
        notification: selectNotification(state)
    });
};

const mapDispatchToProps = (dispatch) => ({
    onShowNotification: (notification) => dispatch(showNotification(notification)),
    onUpdateUserStart: (props) => dispatch(updateUserStart(props))
});

const ConnectedPasswordDataForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(PasswordDataForm);

export default ConnectedPasswordDataForm;
