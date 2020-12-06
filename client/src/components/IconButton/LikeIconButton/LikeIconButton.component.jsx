import React from "react";

import { Like as LikeIcon } from "components/Icon";
import IconButton from "components/BaseIconButton";
import { defaultProps, propTypes } from "../IconButton.props";

LikeIconButton.defaultProps = defaultProps;
LikeIconButton.propTypes = propTypes;

function LikeIconButton ({ onClick, size, ...rest }) {
    return (
        <IconButton
            {...rest}
            onClick={onClick}
            size={size}
            title="Понравилось"
        >
            <LikeIcon size={size} />
        </IconButton>
    );
}

export default LikeIconButton;
