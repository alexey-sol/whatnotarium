import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { CONFIRM_NEW_PASSWORD, NEW_PASSWORD, PASSWORD } from "utils/const/userData";
// import { PASSWORD_TOO_WEAK } from "utils/const/validationErrors";
import BaseButton from "components/BaseButton";
import Input from "components/Input";
import { defaultProps, propTypes } from "./PasswordDataForm.props";
import { selectCurrentUser } from "redux/session/session.selectors";
import { selectUpdatedProfile } from "redux/user/user.selectors";
import { updateProfileReset, updateProfileStart } from "redux/user/user.actions";

import {
    validateConfirmPassword,
    validateNewPassword,
    validatePassword
} from "utils/validators/UserValidator";

import hints from "utils/resources/text/ru/hints";
import styles from "./PasswordDataForm.module.scss";
import useForm from "utils/hooks/useForm.jsx";

PasswordDataForm.defaultProps = defaultProps;
PasswordDataForm.propTypes = propTypes;

function PasswordDataForm ({
    currentUser,
    onUpdateProfileReset,
    onUpdateProfileStart,
    updatedProfile
}) {
    const { error, isPending } = updatedProfile;

    const initialFields = {
        confirmNewPassword: "",
        id: currentUser?.id,
        newPassword: "",
        password: ""
    };

    const initialErrors = {
        confirmNewPassword: "",
        newPassword: ""
    };

    const validateField = (stateName, fields) => {
        const {
            confirmNewPassword,
            newPassword,
            password
        } = fields;

        switch (stateName) {
            case CONFIRM_NEW_PASSWORD:
                return validateConfirmPassword(newPassword, confirmNewPassword);
            case NEW_PASSWORD:
                return validateNewPassword(newPassword);
            case PASSWORD:
                return validatePassword(password);
            default:
                return null;
        }
    };

    const useFormOptions = {
        initialErrors,
        initialFields,
        resetReducerError: onUpdateProfileReset,
        sendFields: onUpdateProfileStart,
        validateField
    };

    const {
        errorCodes,
        errors,
        fields,
        handleInputChange,
        handleSubmit
    } = useForm(useFormOptions);

    const {
        confirmNewPassword,
        newPassword,
        password
    } = fields;

    const {
        newPassword: passwordErrorCode
    } = errorCodes;

    const {
        confirmNewPassword: confirmPasswordError,
        newPassword: newPasswordError,
        password: passwordError
    } = errors;

    // const weakPasswordHint = (passwordErrorCode === PASSWORD_TOO_WEAK)
    //     ? hints.weakPassword
    //     : "";

    return (
        <form
            className={styles.container}
            onSubmit={handleSubmit}
        >
            <Input
                error={passwordError}
                label="Текущий пароль"
                name={PASSWORD}
                onChange={handleInputChange}
                type="password"
                value={password}
            />

            <Input
                error={newPasswordError}
                // errorTooltipText={weakPasswordHint}
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
                disabled={isPending}
                text="Изменить пароль"
            />
        </form>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    updatedProfile: selectUpdatedProfile
});

const mapDispatchToProps = (dispatch) => ({
    onUpdateProfileReset: () => dispatch(updateProfileReset()),
    onUpdateProfileStart: (props) => dispatch(updateProfileStart(props))
});

const ConnectedPasswordDataForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(PasswordDataForm);

export default ConnectedPasswordDataForm;
