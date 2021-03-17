import { Form, Formik } from "formik";
import { Redirect } from "react-router";
import React, { useState } from "react";
import { connect } from "react-redux";

import { EMAIL } from "utils/const/userData";

import { HIDE_NOTIFICATION } from "utils/const/events";
import { SESSION_PREFIX } from "utils/const/actionTypeAffixes";
import BaseButton from "components/BaseButton";
import FormInput from "components/FormInput";
import { defaultProps, propTypes } from "./ForgotPasswordContent.props";
import { restorePasswordStart } from "redux/support/support.actions";
import { selectNotification, selectRelevantPendingAction } from "redux/ui/ui.selectors";
import forgotPasswordSchema from "utils/validators/shemas/forgotPassword";
import pubsub from "utils/pubsub";
import styles from "./ForgotPasswordContent.module.scss";

const initialValues = {
    email: ""
};

ForgotPasswordContent.defaultProps = defaultProps;
ForgotPasswordContent.propTypes = propTypes;

function ForgotPasswordContent ({
    isPending,
    notification,
    onClose,
    onRestorePasswordStart
}) {
    const handleChangeWrapper = (event, cb) => {
        if (notification) {
            pubsub.publish(HIDE_NOTIFICATION);
        }

        cb(event);
    };

    const submitEmail = (cred) => onRestorePasswordStart(cred, () => {
        // if (skipConfirmEmail) {
        //     onClose();
        // } else {
        //     setDone(true);
        // }
    });

    const formElem = (
        <Formik
            initialValues={initialValues}
            onSubmit={submitEmail}
            validateOnChange
            validationSchema={forgotPasswordSchema}
        >
            {({ errors, handleChange }) => (
                <Form className={styles.container}>
                    <FormInput
                        label="Ваш email"
                        name={EMAIL}
                        onChange={event => handleChangeWrapper(event, handleChange)}
                        type="email"
                    />

                    <BaseButton
                        className={styles.signUpButton}
                        disabled={isPending || Object.keys(errors).length > 0}
                        text="Отправить"
                    />
                </Form>
            )}
        </Formik>
    );

    return (
        <div className={styles.container}>
            {formElem}
        </div>
    );
}

const mapStateToProps = () => {
    return (state) => ({
        isPending: Boolean(selectRelevantPendingAction(state, { actionPrefix: SESSION_PREFIX })),
        notification: selectNotification(state)
    });
};

const mapDispatchToProps = (dispatch) => ({
    onRestorePasswordStart: (credentials, cb) => dispatch(restorePasswordStart(credentials, cb))
});

const ConnectedSignUpContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPasswordContent);

export default ConnectedSignUpContent;
