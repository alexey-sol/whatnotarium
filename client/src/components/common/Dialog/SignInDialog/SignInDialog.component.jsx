import React, { memo, useState } from "react";

import BaseButton from "components/BaseButton";
import BaseDialog from "components/BaseDialog";
import CustomLink from "components/CustomLink";
import Input from "components/Input";
import { propTypes } from "../Dialog.props";
import styles from "./SignInDialog.module.scss";

SignInDialog.propTypes = propTypes;

function SignInDialog ({ onClose, showSignUpDialog }) {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

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

        //
    };

    const handleSignUp = (event) => {
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
                            onClick={handleSignUp}
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
