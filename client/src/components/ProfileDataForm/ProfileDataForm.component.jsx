import _ from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { EMAIL, NAME } from "utils/const/userData";
import BaseButton from "components/BaseButton";
import Input from "components/Input";
import { defaultProps, propTypes } from "./ProfileDataForm.props";
import { selectCurrentUser } from "redux/session/session.selectors";

import {
    selectUpdatedProfile,
    selectUpdatedProfileError
} from "redux/user/user.selectors";

import { setCurrentUser } from "redux/session/session.actions";
import { updateProfileReset, updateProfileStart } from "redux/user/user.actions";
import { validateEmail, validateName } from "utils/validators/Validator";
import formatReducerError from "utils/helpers/formatReducerError";
import styles from "./ProfileDataForm.module.scss";
import useForm from "utils/hooks/useForm.jsx";

ProfileDataForm.defaultProps = defaultProps;
ProfileDataForm.propTypes = propTypes;

function ProfileDataForm ({
    currentUser,
    onSetCurrentUser,
    onUpdateProfileReset,
    onUpdateProfileStart,
    updatedProfile,
    updatedProfileError
}) {
    const initialProps = {
        email: currentUser?.email,
        id: currentUser?.id,
        name: currentUser?.name
    };

    const initialErrors = {
        name: "",
        ...formatReducerError(updatedProfileError, ["email"])
    };

    const validateProp = (stateName, props) => {
        const { email, name } = props;

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
        initialProps,
        resetReducerError: onUpdateProfileReset,
        sendProps: onUpdateProfileStart,
        validateProp
    };

    const {
        props,
        errors,
        handleInputChange,
        handleSubmit
    } = useForm(useFormOptions);

    const { email, name } = props;

    const {
        email: emailError,
        name: nameError
    } = errors;

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
                theme="dark"
                title="Сохранить"
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
    onSetCurrentUser: () => dispatch(setCurrentUser()),
    onUpdateProfileReset: () => dispatch(updateProfileReset()),
    onUpdateProfileStart: (params) => dispatch(updateProfileStart(params))
});

const ConnectedProfileDataForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileDataForm);

export default ConnectedProfileDataForm;
