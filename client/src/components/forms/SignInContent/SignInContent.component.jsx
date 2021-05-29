import { Form, Formik } from "formik";
import { Redirect, withRouter } from "react-router";
import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import * as p from "utils/const/pathnames";
import { EMAIL, PASSWORD } from "utils/const/userData";
import { GoogleConsentScreen, YandexConsentScreen } from "utils/wrappers/OauthConsentScreen";
import { HIDE_NOTIFICATION } from "utils/const/events";
import { NOT_VERIFIED } from "utils/const/validationErrors";
import { SESSION_PREFIX } from "utils/const/actionTypeAffixes";
import BaseButton from "components/ui/BaseButton";
import CustomLink from "components/ui/CustomLink";
import FormInput from "components/forms/FormInput";
import { defaultProps, propTypes } from "./SignInContent.props";
import { resetSessionError, signInStart } from "redux/session/session.actions";
import { selectCurrentUser, selectError } from "redux/session/session.selectors";
import { selectNotification, selectRelevantPendingAction } from "redux/ui/ui.selectors";
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
    onResetSessionError,
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
        if (showForgotPass) showForgotPass();
    }, [onClose, showForgotPass]);

    const openWindowToSignUpViaYandex = () => {
        const consentScreen = new YandexConsentScreen();
        consentScreen.openWindow();
    };

    const openWindowToSignUpViaGoogle = () => {
        const consentScreen = new GoogleConsentScreen();
        consentScreen.openWindow();
    };

    useEffect(() => {
        const shouldRedirectToSupportPage = (
            sessionError?.message === NOT_VERIFIED &&
            sessionError?.additionalData
        );

        if (shouldRedirectToSupportPage) {
            const { email } = sessionError.additionalData;
            history.push(`/${p.SUPPORT}/${p.CONFIRM}/${p.EMAIL}/${email}`);
            onResetSessionError();
            onClose();
        }
    }, [history, onClose, onResetSessionError, sessionError]);

    const elem = (
        <div className={styles.container}>
            <Formik
                initialValues={initialValues}
                onSubmit={(props) => onSignInStart(props, () => history.push("/"))}
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
                <p>
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
                                onClick={openWindowToSignUpViaGoogle}
                                text="Google"
                                theme="neutral"
                                width="full"
                            />
                        </li>

                        <li>
                            <BaseButton
                                onClick={openWindowToSignUpViaYandex}
                                text="Яндекс"
                                theme="neutral"
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

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    isPending: (state) => Boolean(selectRelevantPendingAction(state, {
        actionPrefix: SESSION_PREFIX
    })),
    notification: selectNotification,
    sessionError: selectError
});

const mapDispatchToProps = (dispatch) => ({
    onResetSessionError: () => dispatch(resetSessionError()),
    onSignInStart: (credentials, cb) => dispatch(signInStart(credentials, cb))
});

const ConnectedSignInContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInContent);

export default withRouter(ConnectedSignInContent);
