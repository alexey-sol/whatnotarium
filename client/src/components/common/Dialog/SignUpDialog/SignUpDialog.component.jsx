import React, { memo, useState } from "react";

import BaseButton from "components/BaseButton";
import BaseDialog from "components/BaseDialog";
import Input from "components/Input";
import { propTypes } from "../Dialog.props";
import { signUp } from "common/utils/api";
import { validateEmail, validatePassword } from "common/utils/Validator";
import discardFalsyValues from "common/utils/discardFalsyValues";
import deriveNewErrorsState from "common/utils/deriveNewErrorsState";
import isEmptyObject from "common/utils/isEmptyObject";
import styles from "./SignUpDialog.module.scss";

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

        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = validate(credentials);
        setUpdatedErrors(errors, signUp);
    };

    const validate = ({ email, password }) => {
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        const errors = discardFalsyValues({
            emailError,
            passwordError
        });

        const hasErrors = !isEmptyObject(errors);

        return (hasErrors)
            ? errors
            : null;
    };

    const setUpdatedErrors = (updatedErrors, callback) => { // duplicates
        if (updatedErrors) {
            const newErrorsState = deriveNewErrorsState(updatedErrors);
            setErrors(newErrorsState);
        } else {
            setErrors(INITIAL_ERRORS);
            if (callback) callback();
        }
    };

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
                    label="Имя"
                    name="name"
                    onChange={handleInputChange}
                    rootClassName={styles.inputContainer}
                    type="text"
                    value={name}
                />

                <Input
                    label="Email"
                    name="email"
                    onChange={handleInputChange}
                    rootClassName={styles.inputContainer}
                    type="email"
                    value={email}
                />

                <Input
                    label="Пароль"
                    name="password"
                    onChange={handleInputChange}
                    rootClassName={styles.inputContainer}
                    type="password"
                    value={password}
                />

                <Input
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
