import React from "react";

import { Dislike as DislikeIcon } from "components/Icon";
import IconButton from "components/BaseIconButton";
import { defaultProps, propTypes } from "../IconButton.props";

DislikeActiveIconButton.defaultProps = defaultProps;
DislikeActiveIconButton.propTypes = propTypes;

function DislikeActiveIconButton ({ onClick, size, ...rest }) {
    return (
        <IconButton
            {...rest}
            onClick={onClick}
            size={size}
            title="Удалить оценку"
        >
            <DislikeIcon size={size} />
        </IconButton>
    );
}

export default DislikeActiveIconButton;
