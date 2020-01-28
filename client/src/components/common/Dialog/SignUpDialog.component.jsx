import React, { memo, useState } from "react";

import BaseDialog from "components/BaseDialog";
import Input from "components/Input";
import { propTypes } from "./Dialog.props";
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

    return (
        <BaseDialog onClose={onClose}>
            <form className={styles.container}>
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
                    label="Повторите пароль"
                    name="confirmPassword"
                    onChange={handleInputChange}
                    rootClassName={styles.inputContainer}
                    type="password"
                    value={confirmPassword}
                />
            </form>
        </BaseDialog>
    );
}

export default memo(SignUpDialog);
