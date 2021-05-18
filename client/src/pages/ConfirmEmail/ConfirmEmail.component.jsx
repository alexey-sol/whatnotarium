import React from "react";
import { connect } from "react-redux";

import { DEFAULT_TIMEOUT_IN_MS, SUCCESS } from "utils/const/notificationProps";
import CustomLink from "components/ui/CustomLink";
import Notification from "utils/objects/Notification";
import { propTypes } from "./ConfirmEmail.props";
import { sendConfirmTokenStart } from "redux/support/support.actions";
import { showNotification } from "redux/ui/ui.actions";
import styles from "./ConfirmEmail.module.scss";

const EMAIL_SENT = "Письмо выслано";

ConfirmEmail.propTypes = propTypes;

function ConfirmEmail ({
    match,
    onSendConfirmTokenStart,
    onShowNotification
}) {
    const { email } = match.params;

    const resendEmailAndShowSuccess = () => {
        onSendConfirmTokenStart({ email }, () => onShowNotification(getSuccessNotif(EMAIL_SENT)));
    };

    const renderResendEmailLink = (text) => (
        <CustomLink onClick={resendEmailAndShowSuccess} to="/">
            {text}
        </CustomLink>
    );

    return (
        <div className={styles.container}>
            <p>
                Ваш email &quot;{email}&quot; не подтвержден. Если вы не получили письмо (или
                срок действия токена истек), пожалуйста, перейдите по ссылке:&nbsp;
                {renderResendEmailLink("отправить письмо еще раз")}.
            </p>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    onSendConfirmTokenStart: (data, cb) => dispatch(sendConfirmTokenStart(data, cb)),
    onShowNotification: (notification) => dispatch(showNotification(notification))
});

const ConnectedConfirmToken = connect(
    null,
    mapDispatchToProps
)(ConfirmEmail);

export default ConnectedConfirmToken;

function getSuccessNotif (text) {
    return new Notification(text, SUCCESS, DEFAULT_TIMEOUT_IN_MS);
}
