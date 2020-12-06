import React from "react";

import { LikeActive as LikeActiveIcon } from "components/Icon";
import IconButton from "components/BaseIconButton";
import { defaultProps, propTypes } from "../IconButton.props";

LikeActiveIconButton.defaultProps = defaultProps;
LikeActiveIconButton.propTypes = propTypes;

function LikeActiveIconButton ({ onClick, size, ...rest }) {
    return (
        <IconButton
            {...rest}
            onClick={onClick}
            size={size}
            title="Удалить оценку"
        >
            <LikeActiveIcon size={size} />
        </IconButton>
    );
}

export default LikeActiveIconButton;
