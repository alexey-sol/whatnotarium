import React, { memo, useState } from "react";

import { PASSWORD_TOO_WEAK } from "common/constants/validationErrors";
import BaseButton from "components/BaseButton";
import BaseDialog from "components/BaseDialog";
import Input from "components/Input";
import { propTypes } from "../Dialog.props";
import { signUp } from "common/utils/api";

import {
    validateEmail,
    validateName,
    validatePassword,
    validateConfirmPassword
} from "common/utils/Validator";

import discardFalsyValues from "common/utils/discardFalsyValues";
import deriveNewErrorsState from "common/utils/deriveNewErrorsState";
import hints from "common/resources/text/hints";
import isEmptyObject from "common/utils/isEmptyObject";
import styles from "./SignUpDialog.module.scss";
import translateError from "common/utils/translateError";

SignUpDialog.propTypes = propTypes;

const INITIAL_CREDENTIALS = {
    confirmPassword: "",
    email: "",
    name: "",
    password: ""
};

const INITIAL_ERRORS = {
    confirmPasswordError: "",
    emailError: "",
    nameError: "",
    passwordError: ""
};

function SignUpDialog ({ onClose }) {
    const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS);
    const [errors, setErrors] = useState(INITIAL_ERRORS);

    const {
        confirmPassword,
        email,
        name,
        password
    } = credentials;

    const {
        confirmPasswordError,
        emailError,
        nameError,
        passwordError
    } = errors;

    const handleInputChange = ({ target }) => {
        const { name, value } = target;

        const newCredentials = {
            ...credentials,
            [name]: value
        };

        setCredentials(newCredentials);

        const hasValidationErrors = !isEmptyObject(discardFalsyValues(errors));

        if (hasValidationErrors) { // ok
            const updatedErrors = validate(newCredentials);
            setUpdatedErrors(updatedErrors);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = validate(credentials);
        setUpdatedErrors(errors, signUp);
    };

    const validate = ({ confirmPassword, email, name, password }) => {
        const emailError = translateError(validateEmail(email));
        const nameError = translateError(validateName(name));
        const passwordError = translateError(validatePassword(password, true));
        const confirmPasswordError = translateError(validateConfirmPassword(
            password,
            confirmPassword
        ));

        const errors = discardFalsyValues({
            confirmPasswordError,
            emailError,
            nameError,
            passwordError
        });

        const hasErrors = !isEmptyObject(errors);

        return (hasErrors)
            ? errors
            : null;
    };

    const setUpdatedErrors = (updatedErrors, callback) => {
        if (updatedErrors) {
            const newErrorsState = deriveNewErrorsState(updatedErrors);
            setErrors(newErrorsState);
        } else {
            setErrors(INITIAL_ERRORS);
            if (callback) callback();
        }
    };

    const weakPasswordHint = (passwordError === PASSWORD_TOO_WEAK)
        ? hints.weakPassword
        : "";

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
                    name="name"
                    onChange={handleInputChange}
                    rootClassName={styles.inputContainer}
                    type="text"
                    value={name}
                />

                <Input
                    error={emailError}
                    label="Email"
                    name="email"
                    onChange={handleInputChange}
                    rootClassName={styles.inputContainer}
                    type="email"
                    value={email}
                />

                <Input
                    error={passwordError}
                    errorTooltip={weakPasswordHint}
                    hasFixedTooltip
                    label="Пароль"
                    name="password"
                    onChange={handleInputChange}
                    rootClassName={styles.inputContainer}
                    type="password"
                    value={password}
                />

                <Input
                    error={confirmPasswordError}
                    label="Пароль еще раз"
                    name="confirmPassword"
                    onChange={handleInputChange}
                    rootClassName={styles.inputContainer}
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

export default memo(SignUpDialog);
