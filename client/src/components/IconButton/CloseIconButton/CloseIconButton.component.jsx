import React from "react";

import { Close as CloseIcon } from "components/Icon";
import IconButton from "components/BaseIconButton";
import { defaultProps, propTypes } from "../IconButton.props";

CloseIconButton.defaultProps = defaultProps;
CloseIconButton.propTypes = propTypes;

function CloseIconButton ({ onClick, size, ...rest }) {
    return (
        <IconButton
            {...rest}
            onClick={onClick}
            size={size}
            title="Закрыть"
        >
            <CloseIcon size={size} />
        </IconButton>
    );
}

export default CloseIconButton;
