import { Redirect } from "react-router";
import React, { useCallback, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { EMAIL, PASSWORD } from "utils/const/userData";
import { OUT_OF_FIELD } from "utils/const/fieldErrors";
import { SignInContext } from "components/ActionsMenu";
import BaseButton from "components/BaseButton";
import CustomLink from "components/CustomLink";
import Input from "components/Input";
import Popup from "components/Popup";
import { defaultProps, propTypes } from "./SignInContent.props";
import { resetUserError, signInStart } from "redux/user/user.actions";
import { selectCurrentUser, selectUserError } from "redux/user/user.selectors";
import { validateEmail, validatePassword } from "utils/validators/Validator";
import formatReducerError from "utils/helpers/formatReducerError";
import styles from "./SignInContent.module.scss";
import useAuthentication from "utils/hooks/useAuthentication.jsx";

SignInContent.defaultProps = defaultProps;
SignInContent.propTypes = propTypes;

const initialProps = {
    email: "",
    password: ""
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
        ...formatReducerError(userError)
    };

    const validateProp = (stateName, credentials) => {
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
        email,
        password
    } = props;

    const {
        email: emailError,
        password: passwordError,
        [OUT_OF_FIELD]: outOfFieldError
    } = errors;

    const hidePopup = useCallback(() => onResetUserError(), [onResetUserError]);

    const handleClickOnSignUp = useCallback((event) => {
        event.preventDefault();

        if (onClose) onClose();
        showSignUp();
    }, [onClose, showSignUp]);

    const signInUsingYandex = useCallback(() => {
        console.log("signInUsingYandex");
    }, []);

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

            {Boolean(outOfFieldError) && (
                <Popup
                    onClose={hidePopup}
                    text={outOfFieldError}
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
