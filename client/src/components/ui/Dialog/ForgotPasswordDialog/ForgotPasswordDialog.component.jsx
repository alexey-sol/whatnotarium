import React from "react";

import BaseDialog from "components/ui/BaseDialog";
import ForgotPasswordContent from "components/forms/ForgotPasswordContent";
import { propTypes } from "./ForgotPasswordDialog.props";

ForgotPasswordDialog.propTypes = propTypes;

function ForgotPasswordDialog ({ onClose }) {
    return (
        <BaseDialog
            onClose={onClose}
            title="Восстановление пароля"
            width="fixed"
        >
            <ForgotPasswordContent onClose={onClose} />
        </BaseDialog>
    );
}

export default ForgotPasswordDialog;
