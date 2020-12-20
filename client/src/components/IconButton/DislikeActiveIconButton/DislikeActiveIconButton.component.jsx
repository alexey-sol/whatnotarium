import React from "react";

import { DislikeActive as DislikeActiveIcon } from "components/Icon";
import IconButton from "components/BaseIconButton";
import { defaultProps, propTypes } from "../IconButton.props";

DislikeActiveIconButton.defaultProps = defaultProps;
DislikeActiveIconButton.propTypes = propTypes;

function DislikeActiveIconButton ({
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
                <DislikeActiveIcon size={size} />
            </IconButton>
        </div>
    );
}

export default DislikeActiveIconButton;
