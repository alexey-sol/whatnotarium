import React from "react";

import BaseDialog from "components/BaseDialog";
import ForgotPasswordContent from "components/ForgotPasswordContent";
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
