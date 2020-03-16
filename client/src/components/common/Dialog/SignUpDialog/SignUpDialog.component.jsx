import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
    CONFIRM_PASSWORD,
    EMAIL,
    NAME,
    PASSWORD
} from "common/constants/userData";

import { PASSWORD_TOO_WEAK } from "common/constants/validationErrors";
import BaseButton from "components/BaseButton";
import BaseDialog from "components/BaseDialog";
import Input from "components/Input";
import { defaultProps, propTypes } from "./SignUpDialog.props";
import { selectUserError } from "redux/user/user.selectors";
import { resetUserError, signUpStart } from "redux/user/user.actions";
import getTranslatedReducerError from "common/utils/getTranslatedReducerError";

import {
    validateConfirmPassword,
    validateEmail,
    validateName,
    validateNewPassword
} from "common/utils/Validator";

import hints from "common/resources/text/hints";
import styles from "./SignUpDialog.module.scss";
import useAuthentication from "common/utils/customHooks/useAuthentication";

SignUpDialog.propTypes = propTypes;
SignUpDialog.defaultProps = defaultProps;

const INITIAL_CREDENTIALS = {
    confirmPassword: "",
    email: "",
    name: "",
    password: ""
};

function SignUpDialog ({
    onClose,
    resetUserError,
    signUpStart,
    userError
}) {
    const validateCredential = (stateName, credentials) => {
        const {
            confirmPassword,
            email,
            name,
            password
        } = credentials;

        resetUserError();

        switch (stateName) {
            case CONFIRM_PASSWORD:
                return validateConfirmPassword(password, confirmPassword);
            case EMAIL:
                return validateEmail(email);
            case NAME:
                return validateName(name);
            case PASSWORD:
                return validateNewPassword(password);
        }
    };

    const {
        props,
        errorCodes,
        errors,
        handleInputChange,
        handleSubmit
    } = useAuthentication(
        INITIAL_CREDENTIALS,
        INITIAL_CREDENTIALS,
        validateCredential,
        signUpStart
    );

    const {
        confirmPassword,
        email,
        name,
        password
    } = props;

    const {
        password: passwordErrorCode
    } = errorCodes;

    const {
        confirmPassword: confirmPasswordError,
        email: emailError,
        name: nameError,
        password: passwordError
    } = errors;

    const emailServerError = getTranslatedReducerError(userError);

    const weakPasswordHint = (passwordErrorCode === PASSWORD_TOO_WEAK)
        ? hints.weakPassword
        : "";

    useEffect(() => {
        return () => resetUserError();
    }, []);

    return (
        <BaseDialog
            onClose={onClose}
            title="Регистрация"
            width="fixed"
        >
            <form
                className={styles.container}
                onSubmit={handleSubmit}
            >
                <Input
                    error={nameError}
                    label="Имя"
                    name={NAME}
                    onChange={handleInputChange}
                    type="text"
                    value={name}
                />

                <Input
                    error={emailError || emailServerError}
                    label="Email"
                    name={EMAIL}
                    onChange={handleInputChange}
                    type="email"
                    value={email}
                />

                <Input
                    error={passwordError}
                    errorTooltipText={weakPasswordHint}
                    hasFixedTooltip
                    label="Пароль"
                    name={PASSWORD}
                    onChange={handleInputChange}
                    type="password"
                    value={password}
                />

                <Input
                    error={confirmPasswordError}
                    label="Пароль еще раз"
                    name={CONFIRM_PASSWORD}
                    onChange={handleInputChange}
                    type="password"
                    value={confirmPassword}
                />

                <BaseButton
                    className={styles.signUpButton}
                    theme="dark"
                    title="Готово"
                />
            </form>
        </BaseDialog>
    );
}

const mapStateToProps = createStructuredSelector({
    userError: selectUserError
});

const mapDispatchToProps = (dispatch) => ({
    resetUserError: () => dispatch(resetUserError()),
    signUpStart: (credentials) => dispatch(signUpStart(credentials))
});

const ConnectedSignUpDialog = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpDialog);

export default ConnectedSignUpDialog;
