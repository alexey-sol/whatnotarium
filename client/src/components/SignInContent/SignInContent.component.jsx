import { Form, Formik } from "formik";
import { Redirect, withRouter } from "react-router";
import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";

import * as p from "utils/const/pathnames";
import { EMAIL, PASSWORD } from "utils/const/userData";
import { HIDE_NOTIFICATION } from "utils/const/events";
import { NOT_VERIFIED } from "utils/const/validationErrors";
import { SESSION_PREFIX } from "utils/const/actionTypeAffixes";
import BaseButton from "components/BaseButton";
import CustomLink from "components/CustomLink";
import FormInput from "components/FormInput";
import { defaultProps, propTypes } from "./SignInContent.props";
import { selectCurrentUser, selectError } from "redux/session/session.selectors";
import { selectNotification, selectRelevantPendingAction } from "redux/ui/ui.selectors";
import { signInStart } from "redux/session/session.actions";
import pubsub from "utils/pubsub";
import signInSchema from "utils/validators/shemas/signIn";
import styles from "./SignInContent.module.scss";

const initialValues = {
    email: "",
    password: ""
};

SignInContent.defaultProps = defaultProps;
SignInContent.propTypes = propTypes;

function SignInContent ({
    currentUser,
    history,
    isPending,
    notification,
    onClose,
    onSignInStart,
    sessionError,
    showForgotPass,
    showSignUp
}) {
    const handleChangeWrapper = (event, cb) => {
        if (notification) {
            pubsub.publish(HIDE_NOTIFICATION);
        }

        cb(event);
    };

    const handleClickOnSignUp = useCallback((event) => {
        event.preventDefault();

        if (onClose) onClose();
        showSignUp();
    }, [onClose, showSignUp]);

    const handleClickOnForgotPass = useCallback((event) => {
        event.preventDefault();

        if (onClose) onClose();
        showForgotPass();
    }, [onClose, showForgotPass]);

    const signInUsingYandex = useCallback(() => {
        console.log("signInUsingYandex");
    }, []);

    useEffect(() => {
        const shouldRedirectToSupportPage = (
            sessionError?.message === NOT_VERIFIED &&
            sessionError?.additionalData
        );

        if (shouldRedirectToSupportPage) {
            const { email } = sessionError.additionalData;
            history.push(`/${p.SUPPORT}/${p.CONFIRM}/email/${email}`);
            onClose();
        }
    }, [history, onClose, sessionError]);

    const elem = ( // TODO: does styles.form work?
        <div className={styles.container}>
            <Formik
                initialValues={initialValues}
                onSubmit={onSignInStart}
                validateOnChange
                validationSchema={signInSchema}
            >
                {({ errors, handleChange }) => (
                    <Form className={styles.form}>
                        <FormInput
                            label="Email"
                            name={EMAIL}
                            onChange={event => handleChangeWrapper(event, handleChange)}
                            type="text"
                        />

                        <FormInput
                            hasFixedTooltip
                            label="Пароль"
                            name={PASSWORD}
                            onChange={event => handleChangeWrapper(event, handleChange)}
                            type="password"
                        />

                        <BaseButton
                            className={styles.signInButton}
                            disabled={isPending || Object.keys(errors).length > 0}
                            text="Войти"
                            theme="dark"
                        />
                    </Form>
                )}
            </Formik>

            <div className={styles.otherOptions}>
                <p className={styles.forgotPassword}>

                </p>

                <p className={styles.signUpParagraph}>
                    <CustomLink
                        onClick={handleClickOnForgotPass}
                        to="/"
                    >
                        Забыли пароль?
                    </CustomLink>

                    <span>
                        &nbsp;Или вовсе нет аккаунта? Тогда можно&nbsp;
                    </span>

                    <CustomLink
                        onClick={handleClickOnSignUp}
                        to="/"
                    >
                        зарегистрироваться!
                    </CustomLink>
                </p>

                <div className={styles.oauthProvidersContainer}>
                    <p>
                        А еще можно войти с помощью таких сервисов:
                    </p>

                    <ul className={styles.oauthProvidersList}>
                        <li>
                            <BaseButton
                                onClick={signInUsingYandex}
                                disabled
                                text="Яндекс"
                                width="full"
                            />
                        </li>
                    </ul>
                </div>
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
        isPending: Boolean(selectRelevantPendingAction(state, { actionPrefix: SESSION_PREFIX })),
        notification: selectNotification(state),
        sessionError: selectError(state)
    });
};

const mapDispatchToProps = (dispatch) => ({
    onSignInStart: (credentials) => dispatch(signInStart(credentials))
});

const ConnectedSignInContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInContent);

export default withRouter(ConnectedSignInContent);
