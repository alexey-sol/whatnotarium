import { Form, Formik } from "formik";
import { Redirect } from "react-router";
import React, { useState } from "react";
import { connect } from "react-redux";

import { CONFIRM_NEW_PASSWORD, NEW_PASSWORD } from "utils/const/userData";
import { SUCCESS } from "utils/const/notificationProps";
import { SUPPORT_PREFIX } from "utils/const/actionTypeAffixes";
import BaseButton from "components/BaseButton";
import FormInput from "components/FormInput";
import Notification from "utils/objects/Notification";
import Spinner from "components/Spinner";
import { defaultProps, propTypes } from "./ResetToken.props";
import { resetPasswordStart } from "redux/support/support.actions";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectRelevantPendingAction } from "redux/ui/ui.selectors";
import { showNotification } from "redux/ui/ui.actions";
import phrases from "utils/resources/text/ru/commonPhrases";
import resetPasswordSchema from "utils/validators/shemas/resetPassword";
import styles from "./ResetToken.module.scss";

const initialValues = {
    confirmNewPassword: "",
    newPassword: ""
};

ResetToken.defaultProps = defaultProps;
ResetToken.propTypes = propTypes;

function ResetToken ({
    currentUser,
    history,
    isPending,
    match,
    onResetPasswordStart,
    onShowNotification
}) {
    const { token } = match.params;
    const [newPassword, setNewPassword] = useState("");

    const resetPasswordAndShowSuccess = () => {
        onResetPasswordStart({ newPassword, token }, () => {
            onShowNotification(getSuccessNot());
            history.push("/");
        });
    };

    const handleChangeWrapper = (event, cb) => {
        const { target } = event;

        if (target.name === NEW_PASSWORD) {
            setNewPassword(target.value);
        }

        cb(event);
    };

    if (isPending) {
        return <Spinner />;
    }

    const elem = (
        <div className={styles.container}>
            <div className={styles.content}>
                <p>
                    Пожалуйста, придумайте новый пароль.
                </p>

                <Formik
                    initialValues={initialValues}
                    onSubmit={resetPasswordAndShowSuccess}
                    validateOnChange
                    validationSchema={resetPasswordSchema}
                >
                    {({ errors, handleChange }) => (
                        <Form className={styles.container}>
                            <FormInput
                                label="Новый пароль"
                                name={NEW_PASSWORD}
                                onChange={event => handleChangeWrapper(event, handleChange)}
                                rootClassName={styles.input}
                                type="password"
                            />

                            <FormInput
                                label="Новый пароль еще раз"
                                name={CONFIRM_NEW_PASSWORD}
                                onChange={event => handleChangeWrapper(event, handleChange)}
                                rootClassName={styles.input}
                                type="password"
                            />

                            <BaseButton
                                className={styles.submitButton}
                                disabled={isPending || Object.keys(errors).length > 0}
                                text={phrases.done}
                                width="full"
                            />
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );

    return (currentUser)
        ? <Redirect to="/" />
        : elem;
}

const mapStateToProps = () => {
    return (state) => ({
        currentUser: selectCurrentUser(state),
        isPending: Boolean(selectRelevantPendingAction(state, { actionPrefix: SUPPORT_PREFIX }))
    });
};

const mapDispatchToProps = (dispatch) => ({
    onResetPasswordStart: (data, cb) => dispatch(resetPasswordStart(data, cb)),
    onShowNotification: (notification) => dispatch(showNotification(notification))
});

const ConnectedConfirmToken = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetToken);

export default ConnectedConfirmToken;

function getSuccessNot () {
    const RESET_SUCCESS = "Старый пароль сброшен. Теперь вы можете войти при помощи нового пароля";
    return new Notification(RESET_SUCCESS, SUCCESS, 6000);
}
