import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { EMAIL, NAME } from "utils/const/userData";
import BaseButton from "components/BaseButton";
import Input from "components/Input";
import { defaultProps, propTypes } from "./ProfileDataForm.props";

import {
    selectUpdatedProfile,
    selectUpdatedProfileError
} from "redux/user/user.selectors";

import { selectCurrentUser } from "redux/session/session.selectors";
import { selectUpdatedProfilePending } from "redux/pending/pending.selectors";
import { updateProfileReset, updateProfileStart } from "redux/user/user.actions";
import { validateEmail, validateName } from "utils/validators/Validator";
import formatReducerError from "utils/helpers/formatReducerError";
import styles from "./ProfileDataForm.module.scss";
import useForm from "utils/hooks/useForm.jsx";

ProfileDataForm.defaultProps = defaultProps;
ProfileDataForm.propTypes = propTypes;

function ProfileDataForm ({
    currentUser,
    onUpdateProfileReset,
    onUpdateProfileStart,
    updatedProfileError,
    updatedProfilePending
}) {
    const initialFields = {
        email: currentUser?.email,
        id: currentUser?.id,
        name: currentUser?.name
    };

    const initialErrors = {
        name: "",
        ...formatReducerError(updatedProfileError, ["email"])
    };

    const validateField = (stateName, fields) => {
        const { email, name } = fields;

        switch (stateName) {
            case EMAIL:
                return validateEmail(email);
            case NAME:
                return validateName(name);
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
        errors,
        fields,
        handleInputChange,
        handleSubmit
    } = useForm(useFormOptions);

    const { email, name } = fields;

    const {
        email: emailError,
        name: nameError
    } = errors;

    const { pending } = updatedProfilePending;

    return (
        <form
            className={styles.container}
            onSubmit={handleSubmit}
        >
            <Input
                error={nameError}
                label="Имя"
                name={NAME}
                onChange={handleInputChange}
                type="text"
                value={name}
            />

            <Input
                error={emailError}
                label="Email"
                name={EMAIL}
                onChange={handleInputChange}
                type="email"
                value={email}
            />

            <BaseButton
                className={styles.updateProfileDataButton}
                disabled={pending}
                theme="dark"
                title="Сохранить"
            />
        </form>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    updatedProfile: selectUpdatedProfile,
    updatedProfileError: selectUpdatedProfileError,
    updatedProfilePending: selectUpdatedProfilePending
});

const mapDispatchToProps = (dispatch) => ({
    onUpdateProfileReset: () => dispatch(updateProfileReset()),
    onUpdateProfileStart: (props) => dispatch(updateProfileStart(props))
});

const ConnectedProfileDataForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileDataForm);

export default ConnectedProfileDataForm;
