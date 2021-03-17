import { Form, Formik } from "formik";
import React from "react";
import { connect } from "react-redux";

import { DEFAULT_TIMEOUT_IN_MS, SUCCESS } from "utils/const/notificationProps";
import { EMAIL } from "utils/const/userData";
import { HIDE_NOTIFICATION } from "utils/const/events";
import { SESSION_PREFIX } from "utils/const/actionTypeAffixes";
import BaseButton from "components/BaseButton";
import FormInput from "components/FormInput";
import Notification from "utils/objects/Notification";
import { defaultProps, propTypes } from "./ForgotPasswordContent.props";
import { restorePasswordStart } from "redux/support/support.actions";
import { selectNotification, selectRelevantPendingAction } from "redux/ui/ui.selectors";
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
    onRestorePasswordStart,
    onShowNotification
}) {
    const submitEmailAndShowSuccess = ({ email }) => {
        onRestorePasswordStart({ email }, () => {
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

const mapStateToProps = () => {
    return (state) => ({
        isPending: Boolean(selectRelevantPendingAction(state, { actionPrefix: SESSION_PREFIX })),
        notification: selectNotification(state)
    });
};

const mapDispatchToProps = (dispatch) => ({
    onRestorePasswordStart: (credentials, cb) => dispatch(restorePasswordStart(credentials, cb)),
    onShowNotification: (notification) => dispatch(showNotification(notification))
});

const ConnectedSignUpContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPasswordContent);

export default ConnectedSignUpContent;
