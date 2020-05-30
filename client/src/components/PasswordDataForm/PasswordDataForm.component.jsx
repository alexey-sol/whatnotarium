import _ from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { CONFIRM_NEW_PASSWORD, NEW_PASSWORD, PASSWORD } from "utils/const/userData";
import { PASSWORD_TOO_WEAK } from "utils/const/validationErrors";
import BaseButton from "components/BaseButton";
import Input from "components/Input";
import { defaultProps, propTypes } from "./PasswordDataForm.props";
import { selectCurrentUser } from "redux/session/session.selectors";

import {
    selectUpdatedProfile,
    selectUpdatedProfileError
} from "redux/user/user.selectors";

import { setCurrentUser } from "redux/session/session.actions";
import { updateProfileReset, updateProfileStart } from "redux/user/user.actions";

import {
    validateConfirmPassword,
    validateNewPassword,
    validatePassword
} from "utils/validators/Validator";

import formatReducerError from "utils/helpers/formatReducerError";
import hints from "utils/resources/text/hints";
import styles from "./PasswordDataForm.module.scss";
import useForm from "utils/hooks/useForm.jsx";

PasswordDataForm.defaultProps = defaultProps;
PasswordDataForm.propTypes = propTypes;

function PasswordDataForm ({
    currentUser,
    onSetCurrentUser,
    onUpdateProfileReset,
    onUpdateProfileStart,
    updatedProfile,
    updatedProfileError
}) {
    const initialProps = {
        confirmNewPassword: "",
        id: currentUser?.id,
        newPassword: "",
        password: ""
    };

    const initialErrors = {
        confirmNewPassword: "",
        newPassword: "",
        ...formatReducerError(updatedProfileError, ["password"])
    };

    const validateProp = (stateName, props) => {
        const {
            confirmNewPassword,
            newPassword,
            password
        } = props;

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
        initialProps,
        resetReducerError: onUpdateProfileReset,
        sendProps: onUpdateProfileStart,
        validateProp
    };

    const {
        props,
        errorCodes,
        errors,
        handleInputChange,
        handleSubmit
    } = useForm(useFormOptions);

    const {
        confirmNewPassword,
        newPassword,
        password
    } = props;

    const {
        newPassword: passwordErrorCode
    } = errorCodes;

    const {
        confirmNewPassword: confirmPasswordError,
        newPassword: newPasswordError,
        password: passwordError
    } = errors;

    const weakPasswordHint = (passwordErrorCode === PASSWORD_TOO_WEAK)
        ? hints.weakPassword
        : "";

    useEffect(() => {
        const shouldUpdateCurrentUser = Boolean(
            updatedProfile &&
            !_.isEqual(currentUser, updatedProfile)
        );

        if (shouldUpdateCurrentUser) {
            onSetCurrentUser(updatedProfile);
        }

        return () => onUpdateProfileReset();
    }, [
        currentUser,
        onSetCurrentUser,
        onUpdateProfileReset,
        updatedProfile
    ]);

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
    updatedProfile: selectUpdatedProfile,
    updatedProfileError: selectUpdatedProfileError
});

const mapDispatchToProps = (dispatch) => ({
    onSetCurrentUser: (updatedData) => dispatch(setCurrentUser(updatedData)),
    onUpdateProfileReset: () => dispatch(updateProfileReset()),
    onUpdateProfileStart: (params) => dispatch(updateProfileStart(params))
});

const ConnectedPasswordDataForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(PasswordDataForm);

export default ConnectedPasswordDataForm;
