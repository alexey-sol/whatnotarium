import React from "react";

import { Cancel as CancelIcon } from "components/Icon";
import IconButton from "components/BaseIconButton";
import { defaultProps, propTypes } from "./CancelIconButton.props";

CancelIconButton.defaultProps = defaultProps;
CancelIconButton.propTypes = propTypes;

function CancelIconButton ({
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
            <CancelIcon
                fill={fill}
                size={size}
            />
        </IconButton>
    );
}

export default CancelIconButton;
