import React from "react";

import { EMAIL, PASSWORD } from "common/constants/credentialProps";
import BaseButton from "components/BaseButton";
import BaseDialog from "components/BaseDialog";
import CustomLink from "components/CustomLink";
import Input from "components/Input";
import { propTypes } from "../Dialog.props";
import { signIn } from "common/utils/api";
import styles from "./SignInDialog.module.scss";
import useAuthentication from "common/utils/customHooks/useAuthentication";

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
    const {
        credentials,
        errors,
        handleInputChange,
        handleSubmit
    } = useAuthentication(
        INITIAL_CREDENTIALS,
        INITIAL_ERRORS,
        signIn
    );

    const {
        email,
        password
    } = credentials;

    const {
        email: emailError,
        password: passwordError
    } = errors;

    const handleClickOnSignUp = (event) => {
        event.preventDefault();

        onClose();
        showSignUpDialog();
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
                        error={emailError}
                        label="Email"
                        name={EMAIL}
                        onChange={handleInputChange}
                        rootClassName={styles.inputContainer}
                        type="text"
                        value={email}
                    />

                    <Input
                        error={passwordError}
                        hasFixedTooltip
                        label="Пароль"
                        name={PASSWORD}
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

export default SignInDialog;
