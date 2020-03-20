import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { CURRENT_PASSWORD, EMAIL } from "common/constants/userData";
import BaseButton from "components/BaseButton";
import CustomLink from "components/CustomLink";
import Input from "components/Input";
import { defaultProps, propTypes } from "./SignInContent.props";
import { resetUserError, signInStart } from "redux/user/user.actions";
import { selectUserError } from "redux/user/user.selectors";
import { validateCurrentPassword, validateEmail } from "common/utils/Validator";
import styles from "./SignInContent.module.scss";
import useAuthentication from "common/utils/customHooks/useAuthentication";

SignInContent.propTypes = propTypes;
SignInContent.defaultProps = defaultProps;

const initialProps = {
    currentPassword: "",
    email: ""
};

function SignInContent ({
    onClose,
    resetUserError,
    showSignUpDialog,
    signInStart,
    userError
}) {
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
        }
    };

    const useAuthenticationOptions = {
        initialErrors,
        initialProps,
        resetReducerError: resetUserError,
        sendProps: signInStart,
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
        showSignUpDialog();
    };

    const signInUsingYandex = () => {
        console.log("signInUsingYandex");
    };

    useEffect(() => {
        return () => resetUserError();
    }, [resetUserError]);

    return (
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
}

const mapStateToProps = createStructuredSelector({
    userError: selectUserError
});

const mapDispatchToProps = (dispatch) => ({
    resetUserError: () => dispatch(resetUserError()),
    signInStart: (credentials) => dispatch(signInStart(credentials))
});

const ConnectedSignInContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInContent);

export default ConnectedSignInContent;
