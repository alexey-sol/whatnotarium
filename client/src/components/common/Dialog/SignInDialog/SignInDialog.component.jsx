import React, { memo, useState } from "react";

import { validateEmail, validatePassword } from "utils/Validator";
import BaseButton from "components/BaseButton";
import BaseDialog from "components/BaseDialog";
import CustomLink from "components/CustomLink";
import Input from "components/Input";
import { propTypes } from "../Dialog.props";
import discardFalsyValues from "utils/discardFalsyValues";
import deriveNewErrorsState from "utils/deriveNewErrorsState";
import isEmptyObject from "utils/isEmptyObject";
import styles from "./SignInDialog.module.scss";
import translateError from "utils/translateError";

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

        if (errors) {
            const newErrorsState = deriveNewErrorsState(errors);
            return setErrors(newErrorsState);
        }

        // submit
        setErrors(INITIAL_ERRORS);
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

        return (isEmptyObject(errors))
            ? null
            : errors;
    };

    const signInUsingYandex = () => {
        console.log("signInUsingYandex");
    };

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
                        label="Email"
                        name="email"
                        onChange={handleInputChange}
                        rootClassName={styles.inputContainer}
                        type="text"
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
