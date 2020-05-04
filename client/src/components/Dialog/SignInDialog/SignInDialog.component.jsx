import React from "react";

import SignInContent from "components/SignInContent";
import BaseDialog from "components/BaseDialog";
import { propTypes } from "./SignInDialog.props";

SignInDialog.propTypes = propTypes;

function SignInDialog ({ onClose }) {
    return (
        <BaseDialog
            onClose={onClose}
            title="Вход"
            width="fixed"
        >
            <SignInContent />
        </BaseDialog>
    );
}

export default SignInDialog;
