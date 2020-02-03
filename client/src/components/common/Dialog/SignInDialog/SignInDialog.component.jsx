import React, { memo, useState } from "react";

import { PASSWORD_TOO_WEAK } from "common/constants/validationErrors";
import BaseButton from "components/BaseButton";
import BaseDialog from "components/BaseDialog";
import CustomLink from "components/CustomLink";
import Input from "components/Input";
import { propTypes } from "../Dialog.props";
import { validateEmail, validatePassword } from "common/utils/Validator";
import discardFalsyValues from "common/utils/discardFalsyValues";
import deriveNewErrorsState from "common/utils/deriveNewErrorsState";
import isEmptyObject from "common/utils/isEmptyObject";
import styles from "./SignInDialog.module.scss";
import translateError from "common/utils/translateError";

SignInDialog.propTypes = propTypes;

const INITIAL_CREDENTIALS = {
    email: "",
    password: ""
};

const INITIAL_ERRORS = {
    emailError: "",
    passwordError: ""
};

function SignInDialog ({ onClose, showSignUpDialog }) {
    const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS);
    const [errors, setErrors] = useState(INITIAL_ERRORS);

    const { email, password } = credentials;
    const { emailError, passwordError } = errors;

    const emailErrorTranslation = translateError(emailError);
    const passwordErrorTranslation = translateError(passwordError);

    const setUpdatedErrors = (updatedErrors, callback) => {
        if (updatedErrors) {
            const newErrorsState = deriveNewErrorsState(updatedErrors);
            setErrors(newErrorsState);
        } else {
            setErrors(INITIAL_ERRORS);
            if (callback) callback();
        }
    };

    const submit = () => {
        console.log("Submit");
    };

    const handleInputChange = ({ target }) => {
        const { name, value } = target;

        const newCredentials = {
            ...credentials,
            [name]: value
        };

        setCredentials(newCredentials);

        const hasValidationErrors = !isEmptyObject(discardFalsyValues(errors));

        if (hasValidationErrors) {
            const updatedErrors = validate(newCredentials);
            setUpdatedErrors(updatedErrors);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = validate(credentials);
        setUpdatedErrors(errors, submit);
    };

    const handleClickOnSignUp = (event) => {
        event.preventDefault();

        onClose();
        showSignUpDialog();
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

    const signInUsingYandex = () => {
        console.log("signInUsingYandex");
    };

    const weakPasswordHint = (passwordError === PASSWORD_TOO_WEAK)
        ? "Не менее 6 символов"
        : "";

    return (
        <BaseDialog
            onClose={onClose}
            title="Вход"
            width="fixed"
        >
            <div className={styles.container}>
                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >
                    <Input
                        error={emailErrorTranslation}
                        label="Email"
                        name="email"
                        onChange={handleInputChange}
                        rootClassName={styles.inputContainer}
                        type="text"
                        value={email}
                    />

                    <Input
                        error={passwordErrorTranslation}
                        errorTooltip={weakPasswordHint}
                        hasFixedTooltip
                        label="Пароль"
                        name="password"
                        onChange={handleInputChange}
                        rootClassName={styles.inputContainer}
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
            </div>
        </BaseDialog>
    );
}

export default memo(SignInDialog);
