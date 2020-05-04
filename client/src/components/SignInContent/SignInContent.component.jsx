import { Redirect } from "react-router";
import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { CURRENT_PASSWORD, EMAIL } from "utils/const/userData";
import BaseButton from "components/BaseButton";
import CustomLink from "components/CustomLink";
import Input from "components/Input";
import SignInContext from "context/SignInContext";
import { defaultProps, propTypes } from "./SignInContent.props";
import { resetUserError, signInStart } from "redux/user/user.actions";
import { selectCurrentUser, selectUserError } from "redux/user/user.selectors";

import {
    validateCurrentPassword,
    validateEmail
} from "utils/validators/Validator";

import styles from "./SignInContent.module.scss";
import useAuthentication from "utils/hooks/useAuthentication.jsx";

SignInContent.defaultProps = defaultProps;
SignInContent.propTypes = propTypes;

const initialProps = {
    currentPassword: "",
    email: ""
};

function SignInContent ({
    currentUser,
    onResetUserError,
    onSignInStart,
    userError
}) {
    const { onClose, showSignUp } = useContext(SignInContext);

    const initialErrors = {
        ...initialProps,
        email: userError?.message?.email
    };

    const validateProp = (stateName, credentials) => {
        const { currentPassword, email } = credentials;

        switch (stateName) {
            case CURRENT_PASSWORD:
                return validateCurrentPassword(currentPassword);
            case EMAIL:
                return validateEmail(email);
            default:
                return null;
        }
    };

    const useAuthenticationOptions = {
        initialErrors,
        initialProps,
        resetReducerError: onResetUserError,
        sendProps: onSignInStart,
        validateProp
    };

    const {
        props,
        errors,
        handleInputChange,
        handleSubmit
    } = useAuthentication(useAuthenticationOptions);

    const {
        currentPassword,
        email
    } = props;

    const {
        currentPassword: currentPasswordError,
        email: emailError
    } = errors;

    const handleClickOnSignUp = (event) => {
        event.preventDefault();

        if (onClose) onClose();
        showSignUp();
    };

    const signInUsingYandex = () => {
        console.log("signInUsingYandex");
    };

    useEffect(() => {
        return () => onResetUserError();
    }, [onResetUserError]);

    const component = (
        <div className={styles.container}>
            <form
                className={styles.form}
                onSubmit={handleSubmit}
            >
                <Input
                    error={emailError}
                    label="Email"
                    name={EMAIL}
                    onChange={handleInputChange}
                    type="text"
                    value={email}
                />

                <Input
                    error={currentPasswordError}
                    hasFixedTooltip
                    label="Пароль"
                    name={CURRENT_PASSWORD}
                    onChange={handleInputChange}
                    type="password"
                    value={currentPassword}
                />

                <BaseButton
                    className={styles.signInButton}
                    theme="dark"
                    title="Войти"
                />
            </form>

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
                                title="Яндекс"
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
        : component;
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    userError: selectUserError
});

const mapDispatchToProps = (dispatch) => ({
    onResetUserError: () => dispatch(resetUserError()),
    onSignInStart: (credentials) => dispatch(signInStart(credentials))
});

const ConnectedSignInContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInContent);

export default ConnectedSignInContent;
