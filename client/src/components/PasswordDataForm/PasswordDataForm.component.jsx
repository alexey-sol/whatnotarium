import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
    CONFIRM_NEW_PASSWORD,
    CURRENT_PASSWORD,
    NEW_PASSWORD
} from "common/constants/userData";

import { PASSWORD_TOO_WEAK } from "common/constants/validationErrors";
import BaseButton from "components/BaseButton";
import Input from "components/Input";
import { defaultProps, propTypes } from "./PasswordDataForm.props";
import { resetUserError, updateProfileStart } from "redux/user/user.actions";
import { selectCurrentUser, selectUserError } from "redux/user/user.selectors";

import {
    validateConfirmPassword,
    validateCurrentPassword,
    validateNewPassword
} from "common/utils/Validator";

import hints from "common/resources/text/hints";
import styles from "./PasswordDataForm.module.scss";
import useAuthentication from "common/utils/customHooks/useAuthentication";

PasswordDataForm.propTypes = propTypes;
PasswordDataForm.defaultProps = defaultProps;

function PasswordDataForm ({
    currentUser,
    resetUserError,
    updateProfileStart,
    userError
}) {
    const initialProps = {
        confirmNewPassword: "",
        currentPassword: "",
        id: currentUser?.id,
        newPassword: ""
    };

    const initialErrors = {
        confirmNewPassword: "",
        currentPassword: userError?.message?.password,
        newPassword: ""
    };

    const validateProp = (stateName, props) => {
        const {
            confirmNewPassword,
            currentPassword,
            newPassword
        } = props;

        switch (stateName) {
            case CONFIRM_NEW_PASSWORD:
                return validateConfirmPassword(newPassword, confirmNewPassword);
            case CURRENT_PASSWORD:
                return validateCurrentPassword(currentPassword);
            case NEW_PASSWORD:
                return validateNewPassword(newPassword);
        }
    };

    const useAuthenticationOptions = {
        initialErrors,
        initialProps,
        resetReducerError: resetUserError,
        sendProps: updateProfileStart,
        validateProp
    };

    const {
        props,
        errorCodes,
        errors,
        handleInputChange,
        handleSubmit
    } = useAuthentication(useAuthenticationOptions);

    const {
        confirmNewPassword,
        newPassword,
        currentPassword
    } = props;

    const {
        newPassword: passwordErrorCode
    } = errorCodes;

    const {
        confirmNewPassword: confirmPasswordError,
        currentPassword: currentPasswordError,
        newPassword: newPasswordError
    } = errors;

    const weakPasswordHint = (passwordErrorCode === PASSWORD_TOO_WEAK)
        ? hints.weakPassword
        : "";

    useEffect(() => {
        return () => resetUserError();
    }, [resetUserError]);

    return (
        <form
            className={styles.container}
            onSubmit={handleSubmit}
        >
            <Input
                error={currentPasswordError}
                label="Текущий пароль"
                name={CURRENT_PASSWORD}
                onChange={handleInputChange}
                type="password"
                value={currentPassword}
            />

            <Input
                error={newPasswordError}
                errorTooltipText={weakPasswordHint}
                hasFixedTooltip
                label="Новый пароль"
                name={NEW_PASSWORD}
                onChange={handleInputChange}
                type="password"
                value={newPassword}
            />

            <Input
                error={confirmPasswordError}
                label="Новый пароль еще раз"
                name={CONFIRM_NEW_PASSWORD}
                onChange={handleInputChange}
                type="password"
                value={confirmNewPassword}
            />

            <BaseButton
                className={styles.updatePasswordDataButton}
                title="Изменить пароль"
            />
        </form>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    userError: selectUserError
});

const mapDispatchToProps = (dispatch) => ({
    resetUserError: () => dispatch(resetUserError()),
    updateProfileStart: (params) => dispatch(updateProfileStart(params))
});

const ConnectedPasswordDataForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(PasswordDataForm);

export default ConnectedPasswordDataForm;
