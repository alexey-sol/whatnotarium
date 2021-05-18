import React from "react";

import { Dislike as DislikeIcon } from "components/ui/Icon";
import IconButton from "components/ui/BaseIconButton";
import { defaultProps, propTypes } from "../IconButton.props";

DislikeIconButton.defaultProps = defaultProps;
DislikeIconButton.propTypes = propTypes;

function DislikeIconButton ({
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
                title={title || "Не нравится"}
            >
                <DislikeIcon size={size} />
            </IconButton>
        </div>
    );
}

export default DislikeIconButton;
