import { Form, Formik } from "formik";
import { Redirect } from "react-router";
import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
    CONFIRM_PASSWORD,
    EMAIL,
    NAME,
    PASSWORD,
    SKIP_CONFIRM_EMAIL
} from "utils/const/userData";

import { HIDE_NOTIFICATION } from "utils/const/events";
import { SESSION_PREFIX } from "utils/const/actionTypeAffixes";
import BaseButton from "components/BaseButton";
import FormCheckbox from "components/FormCheckbox";
import FormInput from "components/FormInput";
import { defaultProps, propTypes } from "./SignUpContent.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectNotification, selectRelevantPendingAction } from "redux/ui/ui.selectors";
import { signUpStart } from "redux/session/session.actions";
import hints from "utils/resources/text/ru/hints";
import phrases from "utils/resources/text/ru/commonPhrases";
import pubsub from "utils/pubsub";
import signUpSchema from "utils/validators/shemas/signUp";
import styles from "./SignUpContent.module.scss";

const initialValues = {
    confirmPassword: "",
    email: "",
    name: "",
    password: ""
};

SignUpContent.defaultProps = defaultProps;
SignUpContent.propTypes = propTypes;

function SignUpContent ({
    currentUser,
    isPending,
    notification,
    onClose,
    onSignUpStart
}) {
    const [specifiedEmail, setSpecifiedEmail] = useState("указанный email");
    const [skipConfirmEmail, setSkipConfirmEmail] = useState(false);
    const [done, setDone] = useState(false);

    // const weakPasswordHint = (passwordErrorCode === PASSWORD_TOO_WEAK) // TODO
    //     ? hints.weakPassword
    //     : "";

    const updateStateIfNeeded = (input) => {
        if (input.name === EMAIL && input.value > 0) {
            setSpecifiedEmail(input.value);
        } else if (input.name === SKIP_CONFIRM_EMAIL) {
            setSkipConfirmEmail(input.value);
        }
    };

    const handleChangeWrapper = (event, cb) => {
        if (notification) {
            pubsub.publish(HIDE_NOTIFICATION);
        }

        updateStateIfNeeded(event.target);
        cb(event);
    };

    const signUp = (cred) => onSignUpStart(cred, () => {
        if (skipConfirmEmail) {
            onClose();
        } else {
            setDone(true);
        }
    });

    const formElem = (
        <Formik
            initialValues={initialValues}
            onSubmit={signUp}
            validateOnChange
            validationSchema={signUpSchema}
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
                        label="Email"
                        name={EMAIL}
                        onChange={event => handleChangeWrapper(event, handleChange)}
                        type="email"
                    />

                    <FormInput
                        label="Пароль"
                        name={PASSWORD}
                        onChange={event => handleChangeWrapper(event, handleChange)}
                        type="password"
                    />

                    <FormInput
                        label="Пароль еще раз"
                        name={CONFIRM_PASSWORD}
                        onChange={event => handleChangeWrapper(event, handleChange)}
                        type="password"
                    />

                    <FormCheckbox
                        label="Пропустить подтверждение email"
                        name={SKIP_CONFIRM_EMAIL}
                        onChange={event => handleChangeWrapper(event, handleChange)}
                    />

                    <BaseButton
                        className={styles.signUpButton}
                        disabled={isPending || Object.keys(errors).length > 0}
                        text={phrases.done}
                    />
                </Form>
            )}
        </Formik>
    );

    const doneMessageElem = (
        <div className={styles.doneMessage}>
            <p>
                Поздравляем! Вы зарегистрированы. Но прежде чем начать пользоваться
                порталом, надлежит подтвердить email.
            </p>

            <p>
                Письмо c инструкцией было отправлено на {specifiedEmail}.
            </p>

            <BaseButton
                onClick={onClose}
                text="Оки"
                width="full"
            />
        </div>
    );

    const resultElem = (
        <div className={styles.container}>
            {done
                ? doneMessageElem
                : formElem}
        </div>
    );

    return (currentUser)
        ? <Redirect to="/" />
        : resultElem;
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    isPending: (state) => Boolean(selectRelevantPendingAction(state, {
        actionPrefix: SESSION_PREFIX
    })),
    notification: selectNotification
});

const mapDispatchToProps = (dispatch) => ({
    onSignUpStart: (credentials, cb) => dispatch(signUpStart(credentials, cb))
});

const ConnectedSignUpContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpContent);

export default ConnectedSignUpContent;
