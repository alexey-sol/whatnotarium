import { Redirect } from "react-router";
import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
    CONFIRM_PASSWORD,
    EMAIL,
    NAME,
    PASSWORD
} from "utils/const/userData";

import { OUT_OF_FIELD } from "utils/const/fieldErrors";
import { PASSWORD_TOO_WEAK } from "utils/const/validationErrors";
import BaseButton from "components/BaseButton";
import Input from "components/Input";
import Popup from "components/Popup";
import { defaultProps, propTypes } from "./SignUpContent.props";
import { clearError, signUpStart } from "redux/session/session.actions";
import { selectCurrentUser, selectError } from "redux/session/session.selectors";

import {
    validateConfirmPassword,
    validateEmail,
    validateName,
    validateNewPassword
} from "utils/validators/Validator";

import formatReducerError from "utils/helpers/formatReducerError";
import hints from "utils/resources/text/hints";
import styles from "./SignUpContent.module.scss";
import useForm from "utils/hooks/useForm.jsx";

SignUpContent.defaultProps = defaultProps;
SignUpContent.propTypes = propTypes;

const initialFields = {
    confirmPassword: "",
    email: "",
    name: "",
    password: ""
};

function SignUpContent ({
    currentUser,
    onClearError,
    onSignUpStart,
    sessionError
}) {
    const initialErrors = {
        ...initialFields,
        ...formatReducerError(sessionError)
    };

    const validateField = (stateName, credentials) => {
        const {
            confirmPassword,
            email,
            name,
            password
        } = credentials;

        switch (stateName) {
            case CONFIRM_PASSWORD:
                return validateConfirmPassword(password, confirmPassword);
            case EMAIL:
                return validateEmail(email);
            case NAME:
                return validateName(name);
            case PASSWORD:
                return validateNewPassword(password);
            default:
                return null;
        }
    };

    const useFormOptions = {
        initialErrors,
        initialFields,
        resetReducerError: onClearError,
        sendFields: onSignUpStart,
        validateField
    };

    const {
        errorCodes,
        errors,
        fields,
        handleInputChange,
        handleSubmit
    } = useForm(useFormOptions);

    const {
        confirmPassword,
        email,
        name,
        password
    } = fields;

    const {
        password: passwordErrorCode
    } = errorCodes;

    const {
        confirmPassword: confirmPasswordError,
        email: emailError,
        name: nameError,
        password: passwordError,
        [OUT_OF_FIELD]: outOfFieldError
    } = errors;

    const weakPasswordHint = (passwordErrorCode === PASSWORD_TOO_WEAK)
        ? hints.weakPassword
        : "";

    const hidePopup = useCallback(() => onClearError(), [onClearError]);

    useEffect(() => {
        return () => onClearError();
    }, [onClearError]);

    const component = (
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
                error={emailError}
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

            {Boolean(outOfFieldError) && (
                <Popup
                    onClose={hidePopup}
                    text={outOfFieldError}
                    theme="error"
                />
            )}
        </form>
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
    onSignUpStart: (credentials) => dispatch(signUpStart(credentials))
});

const ConnectedSignUpContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpContent);

export default ConnectedSignUpContent;
