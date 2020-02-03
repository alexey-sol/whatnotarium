import React, { memo, useState } from "react";

import BaseButton from "components/BaseButton";
import BaseDialog from "components/BaseDialog";
import Input from "components/Input";
import { propTypes } from "../Dialog.props";
import styles from "./SignUpDialog.module.scss";

SignUpDialog.propTypes = propTypes;

function SignUpDialog ({ onClose }) {
    const [credentials, setCredentials] = useState({
        confirmPassword: "",
        email: "",
        name: "",
        password: ""
    });

    const { confirmPassword, email, name, password } = credentials;

    const handleInputChange = ({ target }) => {
        const { name, value } = target;

        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // validate

        fetch("/api/v0/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                name,
                password
            })
        });
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
