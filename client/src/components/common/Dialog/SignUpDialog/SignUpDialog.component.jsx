import React from "react";

import {
    CONFIRM_PASSWORD,
    EMAIL,
    NAME,
    PASSWORD
} from "common/constants/credentialProps";

import { PASSWORD_TOO_WEAK } from "common/constants/validationErrors";
import BaseButton from "components/BaseButton";
import BaseDialog from "components/BaseDialog";
import Input from "components/Input";
import { propTypes } from "../Dialog.props";
import { signUp } from "common/utils/api";
import hints from "common/resources/text/hints";
import styles from "./SignUpDialog.module.scss";
import useAuthentication from "common/utils/customHooks/useAuthentication";

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
    const {
        credentials,
        errorCodes,
        errors,
        handleInputChange,
        handleSubmit
    } = useAuthentication(
        INITIAL_CREDENTIALS,
        INITIAL_ERRORS,
        signUp,
        true
    );

    const {
        confirmPassword,
        email,
        name,
        password
    } = credentials;

    const {
        password: passwordErrorCode
    } = errorCodes;

    const {
        confirmPassword: confirmPasswordError,
        email: emailError,
        name: nameError,
        password: passwordError
    } = errors;

    const weakPasswordHint = (passwordErrorCode === PASSWORD_TOO_WEAK)
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
                    name={NAME}
                    onChange={handleInputChange}
                    rootClassName={styles.inputContainer}
                    type="text"
                    value={name}
                />

                <Input
                    error={emailError}
                    label="Email"
                    name={EMAIL}
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
                    name={PASSWORD}
                    onChange={handleInputChange}
                    rootClassName={styles.inputContainer}
                    type="password"
                    value={password}
                />

                <Input
                    error={confirmPasswordError}
                    label="Пароль еще раз"
                    name={CONFIRM_PASSWORD}
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

export default SignUpDialog;
