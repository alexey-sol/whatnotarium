import { Redirect } from "react-router";
import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { EMAIL, PASSWORD } from "utils/const/userData";
import BaseButton from "components/BaseButton";
import CustomLink from "components/CustomLink";
import Input from "components/Input";
import Popup from "components/Popup";
import { clearError, signInStart } from "redux/session/session.actions";
import { defaultProps, propTypes } from "./SignInContent.props";
import { selectCurrentUser, selectError } from "redux/session/session.selectors";
import { validateEmail, validatePassword } from "utils/validators/UserValidator";
import styles from "./SignInContent.module.scss";
import translateError from "utils/helpers/translateError";
import useForm from "utils/hooks/useForm.jsx";

SignInContent.defaultProps = defaultProps;
SignInContent.propTypes = propTypes;

const initialFields = {
    email: "",
    password: ""
};

function SignInContent ({
    currentUser,
    onClearError,
    onClose,
    onSignInStart,
    sessionError,
    showSignUp
}) {
    const outOfFieldsError = translateError(sessionError);

    const validateField = (stateName, credentials) => {
        const { email, password } = credentials;

        switch (stateName) {
            case EMAIL:
                return validateEmail(email);
            case PASSWORD:
                return validatePassword(password);
            default:
                return null;
        }
    };

    const useFormOptions = {
        initialErrors: initialFields,
        initialFields,
        resetReducerError: onClearError,
        sendFields: onSignInStart,
        validateField
    };

    const {
        errors,
        fields,
        handleInputChange,
        handleSubmit
    } = useForm(useFormOptions);

    const {
        email,
        password
    } = fields;

    const {
        email: emailError,
        password: passwordError
    } = errors;

    const clearSessionState = useCallback(() => onClearError(), [onClearError]);

    const handleClickOnSignUp = useCallback((event) => {
        event.preventDefault();

        if (onClose) onClose();
        showSignUp();
    }, [onClose, showSignUp]);

    const signInUsingYandex = useCallback(() => {
        console.log("signInUsingYandex");
    }, []);

    useEffect(() => {
        return () => onClearError();
    }, [onClearError]);

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
                    error={passwordError}
                    hasFixedTooltip
                    label="Пароль"
                    name={PASSWORD}
                    onChange={handleInputChange}
                    type="password"
                    value={password}
                />

                <BaseButton
                    className={styles.signInButton}
                    text="Войти"
                    theme="dark"
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
                                disabled
                                text="Яндекс"
                                width="full"
                            />
                        </li>
                    </ul>
                </div>
            </div>

            {Boolean(outOfFieldsError) && (
                <Popup
                    onClose={clearSessionState}
                    text={outOfFieldsError}
                    theme="error"
                />
            )}
        </div>
    );

    return (currentUser)
        ? <Redirect to="/" />
        : component;
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    sessionError: selectError
});

const mapDispatchToProps = (dispatch) => ({
    onClearError: () => dispatch(clearError()),
    onSignInStart: (credentials) => dispatch(signInStart(credentials))
});

const ConnectedSignInContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInContent);

export default ConnectedSignInContent;
