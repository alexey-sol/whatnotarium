import { Form, Formik } from "formik";
import { Redirect } from "react-router";
import React from "react";
import { connect } from "react-redux";

import {
    CONFIRM_PASSWORD,
    EMAIL,
    NAME,
    PASSWORD
} from "utils/const/userData";

import { SESSION_PREFIX } from "utils/const/actionTypeAffixes";
import BaseButton from "components/BaseButton";
import FormInput from "components/FormInput";
import { defaultProps, propTypes } from "./SignUpContent.props";
import { signUpStart } from "redux/session/session.actions";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectNotification, selectRelevantPendingAction } from "redux/ui/ui.selectors";
import hints from "utils/resources/text/ru/hints";
import { HIDE_NOTIFICATION } from "utils/const/events";
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
    onSignUpStart
}) {
    // const weakPasswordHint = (passwordErrorCode === PASSWORD_TOO_WEAK) // TODO
    //     ? hints.weakPassword
    //     : "";

    const handleChangeWrapper = (event, cb) => {
        if (notification) {
            pubsub.publish(HIDE_NOTIFICATION);
        }

        cb(event);
    };

    const elem = (
        <div className={styles.container}>
            <Formik
                initialValues={initialValues}
                onSubmit={onSignUpStart}
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

                        <BaseButton
                            className={styles.signUpButton}
                            disabled={isPending || Object.keys(errors).length > 0}
                            text={phrases.done}
                            theme="dark"
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );

    return (currentUser)
        ? <Redirect to="/" />
        : elem;
}

const mapStateToProps = () => {
    return (state) => ({
        currentUser: selectCurrentUser(state),
        isPending: Boolean(selectRelevantPendingAction(state, { actionPrefix: SESSION_PREFIX })),
        notification: selectNotification(state)
    });
};

const mapDispatchToProps = (dispatch) => ({
    onSignUpStart: (credentials) => dispatch(signUpStart(credentials))
});

const ConnectedSignUpContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpContent);

export default ConnectedSignUpContent;
