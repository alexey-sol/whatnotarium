import { Form, Formik } from "formik";
import { Redirect } from "react-router";
import React, { useCallback } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { EMAIL, PASSWORD } from "utils/const/userData";
import { HIDE_NOTIFICATION } from "utils/const/events";
import BaseButton from "components/BaseButton";
import CustomLink from "components/CustomLink";
import FormInput from "components/FormInput";
import { defaultProps, propTypes } from "./SignInContent.props";
import { selectCurrentUser, selectIsPending } from "redux/session/session.selectors";
import { selectNotification } from "redux/ui/ui.selectors";
import { signInStart } from "redux/session/session.actions";
import pubsub from "utils/pubsub";
import signInSchema from "utils/validators/shemas/signIn";
import styles from "./SignInContent.module.scss";

SignInContent.defaultProps = defaultProps;
SignInContent.propTypes = propTypes;

const initialValues = {
    email: "",
    password: ""
};

function SignInContent ({
    currentUser,
    isPending,
    notification,
    onClose,
    onSignInStart,
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

    const signInUsingYandex = useCallback(() => {
        console.log("signInUsingYandex");
    }, []);

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
                <p className={styles.signUpParagraph}>
                    <span>
                        Нет аккаунта?&nbsp;
                    </span>

                    <CustomLink
                        onClick={handleClickOnSignUp}
                        to="/"
                    >
                        Зарегистрироваться!
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

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    notification: selectNotification,
    isPending: selectIsPending
});

const mapDispatchToProps = (dispatch) => ({
    onSignInStart: (credentials) => dispatch(signInStart(credentials))
});

const ConnectedSignInContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInContent);

export default ConnectedSignInContent;
