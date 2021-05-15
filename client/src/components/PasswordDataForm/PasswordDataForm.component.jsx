import { Form, Formik } from "formik";
import React, { useCallback } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { CONFIRM_NEW_PASSWORD, NEW_PASSWORD, PASSWORD } from "utils/const/userData";
// import { PASSWORD_TOO_WEAK } from "utils/const/validationErrors";
import { EXTENDED_TIMEOUT_IN_MS, SUCCESS } from "utils/const/notificationProps";
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
import setUpPasswordSchema from "utils/validators/shemas/setUpPassword";
import styles from "./PasswordDataForm.module.scss";
import updatePasswordSchema from "utils/validators/shemas/updatePassword";

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
        newPassword: "",
        password: ""
    };

    const { hasPassword } = currentUser || {};

    const showSuccess = useCallback(() => {
        const notif = (hasPassword)
            ? "Готово, пароль изменен"
            : "Готово, теперь вы можете входить по логину и паролю";

        onShowNotification(getSuccessNotif(notif));
    }, [hasPassword, onShowNotification]);

    const handleChangeWrapper = (event, cb) => {
        if (notification) {
            pubsub.publish(HIDE_NOTIFICATION);
        }

        cb(event);
    };

    const handleSubmit = (props, { resetForm }) => {
        const { password, ...rest } = props;

        const updatedProps = {
            ...rest,
            id: currentUser?.id
        };

        if (password.length > 0) {
            updatedProps.password = password;
        }

        onUpdateUserStart(updatedProps, () => {
            resetForm();
            showSuccess();
        });
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validateOnChange
            validationSchema={(hasPassword)
                ? updatePasswordSchema
                : setUpPasswordSchema}
        >
            {({ errors, handleChange }) => (
                <Form className={styles.container}>
                    {hasPassword && (
                        <FormInput
                            label="Текущий пароль"
                            name={PASSWORD}
                            onChange={event => handleChangeWrapper(event, handleChange)}
                            type="password"
                        />
                    )}

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
                        text={(hasPassword)
                            ? "Изменить пароль"
                            : "Задать пароль"}
                    />
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
    onUpdateUserStart: (props, cb) => dispatch(updateUserStart(props, cb))
});

const ConnectedPasswordDataForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(PasswordDataForm);

export default ConnectedPasswordDataForm;

function getSuccessNotif (text = phrases.done) {
    return new Notification(text, SUCCESS, EXTENDED_TIMEOUT_IN_MS);
}
