import React from "react";

import { Dislike as DislikeIcon } from "components/Icon";
import IconButton from "components/BaseIconButton";
import { defaultProps, propTypes } from "../IconButton.props";

DislikeIconButton.defaultProps = defaultProps;
DislikeIconButton.propTypes = propTypes;

function DislikeIconButton ({ onClick, size, ...rest }) {
    return (
        <IconButton
            {...rest}
            onClick={onClick}
            size={size}
            title="Не понравилось"
        >
            <DislikeIcon size={size} />
        </IconButton>
    );
}

export default DislikeIconButton;
