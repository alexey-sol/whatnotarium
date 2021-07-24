import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { DEFAULT_TIMEOUT_IN_MS, ERROR } from "utils/const/notificationProps";
import Notification from "utils/objects/Notification";
import OauthError from "utils/errors/OauthError";
import QSParser from "utils/parsers/QSParser";
import { defaultProps, propTypes } from "./OauthCallback.props";
import { getTokenStart, resetOauthError } from "redux/oauth/oauth.actions";
import { selectError } from "redux/oauth/oauth.selectors";
import { showNotification } from "redux/ui/ui.actions";
import phrases from "utils/resources/text/ru/commonPhrases";
import styles from "./OauthCallback.module.scss";
import translateError from "utils/helpers/translateError";

OauthCallback.defaultProps = defaultProps;
OauthCallback.propTypes = propTypes;

function OauthCallback ({
    history,
    location,
    match,
    oauthError,
    onGetTokenStart,
    onResetOauthError,
    onShowNotification
}) {
    const qs = location.search;
    const { provider } = match.params;

    const qsParser = new QSParser(qs);
    const { code, error } = qsParser.parse();

    useEffect(() => {
        if (oauthError) {
            onResetOauthError();
        }

        if (error) {
            const clientOauthError = new OauthError(error);
            const errorMessage = translateError(clientOauthError);
            onShowNotification(getErrorNotif(errorMessage));
        }

        history.push("/");
    }, [error, history, oauthError, onResetOauthError, onShowNotification]);

    useEffect(() => {
        if (code) {
            onGetTokenStart({ code, provider }, () => history.push("/"));
        }
    }, [code, error, history, onGetTokenStart, onShowNotification, provider]);

    return (
        <article className={styles.container} />
    );
}

const mapStateToProps = createStructuredSelector({
    oauthError: selectError
});

const mapDispatchToProps = (dispatch) => ({
    onGetTokenStart: (payload, cb) => dispatch(getTokenStart(payload, cb)),
    onResetOauthError: () => dispatch(resetOauthError()),
    onShowNotification: (notification) => dispatch(showNotification(notification))
});

const ConnectedOauthCallback = connect(
    mapStateToProps,
    mapDispatchToProps
)(OauthCallback);

export default ConnectedOauthCallback;

function getErrorNotif (text = phrases.error) {
    return new Notification(text, ERROR, DEFAULT_TIMEOUT_IN_MS);
}
