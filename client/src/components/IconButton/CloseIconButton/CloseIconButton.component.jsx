import React from "react";

import { Close as CloseIcon } from "components/Icon";
import IconButton from "components/BaseIconButton";
import { propTypes } from "../IconButton.props";

CloseIconButton.propTypes = propTypes;

function CloseIconButton ({ onClick, ...rest }) {
    return (
        <IconButton
            {...rest}
            onClick={onClick}
            title="Закрыть"
        >
            <CloseIcon />
        </IconButton>
    );
}

export default CloseIconButton;
