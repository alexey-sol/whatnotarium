import React from "react";

import BaseDialog from "components/BaseDialog";
import { propTypes } from "./Dialog.props";

AuthDialog.propTypes = propTypes;

function AuthDialog ({ onClose }) {
    return (
        <BaseDialog onClose={onClose}>
            Sign up
        </BaseDialog>
    );
}

export default AuthDialog;
