import { Link } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { defaultProps, propTypes } from "./ConfirmTokenError.props";
import styles from "./ConfirmTokenError.module.scss";
import {fetchPostsStart} from "../../redux/posts/posts.actions";

const RESEND_LINK_TITLE = "Отправить письмо еще раз";

ConfirmTokenError.defaultProps = defaultProps;
ConfirmTokenError.propTypes = propTypes;

function ConfirmTokenError ({ match }) {
    const { token } = match.params;

    const resendEmailLink = (
        <Link onClick={null}>
            отправить письмо еще раз
        </Link>
    );

    // TODO: after sending email, show popup success and redirect to home
    return (
        <div className={styles.container}>
            Если вы не получили письмо (или срок действия токена истек), пожалуйста, перейдите
            по ссылке: ${resendEmailLink}.
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    // onSendConfirmEmailStart: (options) => dispatch(sendConfirmEmailStart(options))
});

export default ConfirmTokenError;
