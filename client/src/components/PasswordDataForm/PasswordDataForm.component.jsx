import { Form, Formik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { CONFIRM_NEW_PASSWORD, NEW_PASSWORD, PASSWORD } from "utils/const/userData";
// import { PASSWORD_TOO_WEAK } from "utils/const/validationErrors";
import BaseButton from "components/BaseButton";
import FormInput from "components/FormInput";
import { HIDE_NOTIFICATION } from "utils/const/events";
import { defaultProps, propTypes } from "./PasswordDataForm.props";
import { selectCurrentUser } from "redux/session/session.selectors";

import { selectIsPending } from "redux/users/users.selectors";
import { selectNotification } from "redux/ui/ui.selectors";
import { updateUserStart } from "redux/users/users.actions";

// import hints from "utils/resources/text/ru/hints";
import phrases from "../../utils/resources/text/ru/commonPhrases";
import pubsub from "../../utils/pubsub";
import styles from "./PasswordDataForm.module.scss";
import updatePasswordSchema from "../../utils/validators/shemas/updatePassword";

PasswordDataForm.defaultProps = defaultProps;
PasswordDataForm.propTypes = propTypes;

function PasswordDataForm ({
    currentUser,
    isPending,
    notification,
    onUpdateUserStart
}) {
    // const weakPasswordHint = (passwordErrorCode === PASSWORD_TOO_WEAK)
    //     ? hints.weakPassword
    //     : "";

    const initialValues = {
        confirmNewPassword: "",
        id: currentUser.id,
        newPassword: "",
        password: ""
    };

    const handleChangeWrapper = (event, cb) => {
        if (notification) {
            pubsub.publish(HIDE_NOTIFICATION);
        }

        cb(event);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onUpdateUserStart} // TODO: relation "hashoptions" does not exist
            validateOnChange
            validationSchema={updatePasswordSchema}
        >
            {({ errors, handleChange }) => (
                <Form className={styles.container}>
                    <FormInput
                        label="Текущий пароль"
                        name={PASSWORD}
                        onChange={event => handleChangeWrapper(event, handleChange)}
                        type="password"
                    />

                    <FormInput
                        label="Новый пароль"
                        name={NEW_PASSWORD}
                        onChange={event => handleChangeWrapper(event, handleChange)}
                        type="password"
                    />

                    <FormInput
                        label="Новый пароль еще раз"
                        name={CONFIRM_NEW_PASSWORD}
                        onChange={event => handleChangeWrapper(event, handleChange)}
                        type="password"
                    />

                    <BaseButton
                        className={styles.updatePasswordDataButton}
                        disabled={isPending || Object.keys(errors).length > 0}
                        text="Изменить пароль"
                    />
                </Form>
            )}
        </Formik>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    isPending: selectIsPending,
    notification: selectNotification
});

const mapDispatchToProps = (dispatch) => ({
    onUpdateUserStart: (props) => dispatch(updateUserStart(props))
});

const ConnectedPasswordDataForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(PasswordDataForm);

export default ConnectedPasswordDataForm;
