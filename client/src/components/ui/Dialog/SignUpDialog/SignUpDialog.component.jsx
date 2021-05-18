import React from "react";

import BaseDialog from "components/ui/BaseDialog";
import SignUpContent from "components/forms/SignUpContent";
import { propTypes } from "./SignUpDialog.props";

SignUpDialog.propTypes = propTypes;

function SignUpDialog ({ onClose }) {
    return (
        <BaseDialog
            onClose={onClose}
            title="Регистрация"
            width="fixed"
        >
            <SignUpContent onClose={onClose} />
        </BaseDialog>
    );
}

export default SignUpDialog;
