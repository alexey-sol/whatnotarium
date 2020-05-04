import React from "react";

import BaseDialog from "components/BaseDialog";
import SignUpContent from "components/SignUpContent";
import { propTypes } from "./SignUpDialog.props";

SignUpDialog.propTypes = propTypes;

function SignUpDialog ({ onClose }) {
    return (
        <BaseDialog
            onClose={onClose}
            title="Регистрация"
            width="fixed"
        >
            <SignUpContent />
        </BaseDialog>
    );
}

export default SignUpDialog;
