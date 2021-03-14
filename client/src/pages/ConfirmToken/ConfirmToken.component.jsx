import React, { useEffect } from "react";
import { connect } from "react-redux";

import { DEFAULT_TIMEOUT_IN_MS, SUCCESS } from "utils/const/notificationProps";
import { SUPPORT_PREFIX } from "utils/const/actionTypeAffixes";
import CustomLink from "components/CustomLink";
import Notification from "utils/objects/Notification";
import Spinner from "components/Spinner";
import { confirmEmailStart, sendConfirmTokenStart } from "redux/support/support.actions";
import { defaultProps, propTypes } from "./ConfirmToken.props";
import { selectError } from "redux/support/support.selectors";
import { selectRelevantPendingAction } from "../../redux/ui/ui.selectors";
import { showNotification } from "redux/ui/ui.actions";
import styles from "./ConfirmToken.module.scss";

const EMAIL_SENT = "Письмо выслано";
const EMAIL_VERIFIED = "Ваш email был успешно подтвержден";

ConfirmToken.defaultProps = defaultProps;
ConfirmToken.propTypes = propTypes;

function ConfirmToken ({
    history,
    isPending,
    match,
    onConfirmEmailStart,
    onSendConfirmTokenStart,
    onShowNotification,
    supportError
}) {
    const { token } = match.params;

    useEffect(() => {
        const shouldInitiateConfirming = history.action === "POP";

        if (shouldInitiateConfirming) {
            onConfirmEmailStart(token, () => {
                history.push("/");
                onShowNotification(getSuccessNot(EMAIL_VERIFIED));
            });
        }
    }, [history, onConfirmEmailStart, onShowNotification, token]);

    const resendEmailAndShowSuccess = () => {
        onSendConfirmTokenStart({ token }, () => onShowNotification(getSuccessNot(EMAIL_SENT)));
    };

    const renderResendEmailLink = (text) => (
        <CustomLink onClick={resendEmailAndShowSuccess} to="/">
            {text}
        </CustomLink>
    );

    if (isPending) {
        return <Spinner />;
    }

    return (
        <div className={styles.container}>
            {Boolean(supportError) && (
                <p>
                    Верификация прошла неудачно. Истек срок действия токена, токен не найден&#8230;
                    А может, email уже подтвержден. Выслать письмо еще раз, с новым токеном?&nbsp;
                    {renderResendEmailLink("Да, выслать")}.
                </p>
            )}
        </div>
    );
}

const mapStateToProps = () => {
    return (state) => ({
        isPending: Boolean(selectRelevantPendingAction(state, { actionPrefix: SUPPORT_PREFIX })),
        supportError: selectError(state)
    });
};

const mapDispatchToProps = (dispatch) => ({
    onConfirmEmailStart: (token, cb) => dispatch(confirmEmailStart(token, cb)),
    onSendConfirmTokenStart: (data, cb) => dispatch(sendConfirmTokenStart(data, cb)),
    onShowNotification: (notification) => dispatch(showNotification(notification))
});

const ConnectedConfirmToken = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmToken);

export default ConnectedConfirmToken;

function getSuccessNot (text) {
    return new Notification(text, SUCCESS, DEFAULT_TIMEOUT_IN_MS);
}
