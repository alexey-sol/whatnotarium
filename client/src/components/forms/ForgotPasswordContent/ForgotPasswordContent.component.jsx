import { Form, Formik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { DEFAULT_TIMEOUT_IN_MS, SUCCESS } from "utils/const/notificationProps";
import { EMAIL } from "utils/const/userData";
import { HIDE_NOTIFICATION } from "utils/const/events";
import { SESSION_PREFIX } from "utils/const/actionTypeAffixes";
import BaseButton from "components/ui/BaseButton";
import FormInput from "components/forms/FormInput";
import Notification from "utils/objects/Notification";
import { defaultProps, propTypes } from "./ForgotPasswordContent.props";
import { selectNotification, selectRelevantPendingAction } from "redux/ui/ui.selectors";
import { sendResetTokenStart } from "redux/support/support.actions";
import { showNotification } from "redux/ui/ui.actions";
import forgotPasswordSchema from "utils/validators/shemas/forgotPassword";
import pubsub from "utils/pubsub";
import styles from "./ForgotPasswordContent.module.scss";

const EMAIL_SENT = "Письмо выслано на указанный email";
const notif = new Notification(EMAIL_SENT, SUCCESS, DEFAULT_TIMEOUT_IN_MS);

const initialValues = { email: "" };

ForgotPasswordContent.defaultProps = defaultProps;
ForgotPasswordContent.propTypes = propTypes;

function ForgotPasswordContent ({
    isPending,
    notification,
    onClose,
    onSendResetTokenStart,
    onShowNotification
}) {
    const submitEmailAndShowSuccess = ({ email }) => {
        onSendResetTokenStart({ email }, () => {
            onShowNotification(notif);
            onClose();
        });
    };

    const handleChangeWrapper = (event, cb) => {
        if (notification) {
            pubsub.publish(HIDE_NOTIFICATION);
        }

        cb(event);
    };

    return (
        <div className={styles.container}>
            <Formik
                initialValues={initialValues}
                onSubmit={submitEmailAndShowSuccess}
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
                            className={styles.submitEmailButton}
                            disabled={isPending || Object.keys(errors).length > 0}
                            text="Отправить"
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    isPending: (state) => Boolean(selectRelevantPendingAction(state, {
        actionPrefix: SESSION_PREFIX
    })),
    notification: selectNotification
});

const mapDispatchToProps = (dispatch) => ({
    onSendResetTokenStart: (credentials, cb) => dispatch(sendResetTokenStart(credentials, cb)),
    onShowNotification: (notification) => dispatch(showNotification(notification))
});

const ConnectedSignUpContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPasswordContent);

export default ConnectedSignUpContent;
