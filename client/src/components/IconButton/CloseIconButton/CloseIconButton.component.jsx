import React from "react";

import { Close as CloseIcon } from "components/Icon";
import IconButton from "components/BaseIconButton";
import { defaultProps, propTypes } from "./CloseIconButton.props";

CloseIconButton.defaultProps = defaultProps;
CloseIconButton.propTypes = propTypes;

function CloseIconButton ({
    fill,
    onClick,
    size,
    title,
    ...rest
}) {
    return (
        <IconButton
            {...rest}
            onClick={onClick}
            size={size}
            title={title}
        >
            <CloseIcon
                fill={fill}
                size={size}
            />
        </IconButton>
    );
}

export default CloseIconButton;
