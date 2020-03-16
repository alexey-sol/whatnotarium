import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { EMAIL, NAME } from "common/constants/userData";
import BaseButton from "components/BaseButton";
import Input from "components/Input";
import { defaultProps, propTypes } from "./ProfileDataForm.props";
import { selectCurrentUser } from "redux/user/user.selectors";
import { updateProfileStart, resetUserError } from "redux/user/user.actions";
import { validateEmail, validateName } from "common/utils/Validator";
import styles from "./ProfileDataForm.module.scss";
import useAuthentication from "common/utils/customHooks/useAuthentication";

ProfileDataForm.propTypes = propTypes;
ProfileDataForm.defaultProps = defaultProps;

const INITIAL_ERRORS = {
    email: "",
    name: ""
};

function ProfileDataForm ({
    currentUser,
    resetUserError,
    updateProfileStart
}) {
    const INITIAL_PROPS = {
        email: currentUser?.email,
        id: currentUser?.id,
        name: currentUser?.name
    };

    const validateProp = (stateName, props) => {
        const { email, name } = props;

        switch (stateName) {
            case EMAIL:
                return validateEmail(email);
            case NAME:
                return validateName(name);
        }
    };

    const {
        props,
        errors,
        handleInputChange,
        handleSubmit
    } = useAuthentication(
        INITIAL_PROPS,
        INITIAL_ERRORS,
        validateProp,
        updateProfileStart
    );

    const {
        email,
        name
    } = props;

    const {
        email: emailError,
        name: nameError
    } = errors;

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
    currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
    resetUserError: () => dispatch(resetUserError()),
    updateProfileStart: (params) => dispatch(updateProfileStart(params))
});

const ConnectedProfileDataForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileDataForm);

export default ConnectedProfileDataForm;
