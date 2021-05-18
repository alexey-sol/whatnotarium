import React from "react";

import { Like as LikeIcon } from "components/ui/Icon";
import IconButton from "components/ui/BaseIconButton";
import { defaultProps, propTypes } from "../IconButton.props";

LikeIconButton.defaultProps = defaultProps;
LikeIconButton.propTypes = propTypes;

function LikeIconButton ({
    onClick,
    size,
    title,
    ...rest
}) {
    return (
        <div title={title || "Не нравится"}>
            <IconButton
                {...rest}
                onClick={onClick}
                size={size}
                title={title || "Нравится"}
            >
                <LikeIcon size={size} />
            </IconButton>
        </div>
    );
}

export default LikeIconButton;
