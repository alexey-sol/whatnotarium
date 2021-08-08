import React from "react";

import BaseDialog from "components/ui/BaseDialog";
import DeleteProfileContent from "components/forms/DeleteProfileContent";
import { propTypes } from "./DeleteProfileDialog.props";

DeleteProfileDialog.propTypes = propTypes;

function DeleteProfileDialog ({ onClose }) {
    return (
        <BaseDialog
            onClose={onClose}
            title="Удаление учетной записи"
        >
            <DeleteProfileContent onClose={onClose} />
        </BaseDialog>
    );
}

export default DeleteProfileDialog;
