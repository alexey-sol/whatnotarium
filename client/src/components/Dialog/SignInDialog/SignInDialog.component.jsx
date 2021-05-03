import React from "react";

import SignInContent from "components/SignInContent";
import BaseDialog from "components/BaseDialog";
import { defaultProps, propTypes } from "./SignInDialog.props";

SignInDialog.defaultProps = defaultProps;
SignInDialog.propTypes = propTypes;

function SignInDialog ({ onClose, showForgotPass, showSignUp }) {
    return (
        <BaseDialog
            onClose={onClose}
            title="Вход"
            width="fixed"
        >
            <SignInContent
                onClose={onClose}
                showForgotPass={showForgotPass}
                showSignUp={showSignUp}
            />
        </BaseDialog>
    );
}

export default SignInDialog;
