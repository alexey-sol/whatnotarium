import React from "react";
import { connect } from "react-redux";

import { EMAIL, PASSWORD } from "common/constants/credentialProps";
import BaseButton from "components/BaseButton";
import BaseDialog from "components/BaseDialog";
import CustomLink from "components/CustomLink";
import Input from "components/Input";
import { propTypes } from "./SignInDialog.props";
import { signInStart } from "redux/user/user.actions";
import { validateEmail, validatePassword } from "common/utils/Validator";
import styles from "./SignInDialog.module.scss";
import useAuthentication from "common/utils/customHooks/useAuthentication";

SignInDialog.propTypes = propTypes;

const INITIAL_CREDENTIALS = {
    email: "",
    password: ""
};

function SignInDialog ({ onClose, showSignUpDialog, signInStart }) {
    const validateCredential = (stateName, credentials) => {
        const { email, password } = credentials;

        switch (stateName) {
            case EMAIL:
                return validateEmail(email);
            case PASSWORD:
                return validatePassword(password);
        }
    };

    const {
        credentials,
        errors,
        handleInputChange,
        handleSubmit
    } = useAuthentication(
        INITIAL_CREDENTIALS,
        validateCredential,
        signInStart
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

const mapDispatchToProps = (dispatch) => ({
    signInStart: (credentials) => dispatch(signInStart(credentials))
});

const ConnectedSignInDialog = connect(
    null,
    mapDispatchToProps
)(SignInDialog);

export default ConnectedSignInDialog;
