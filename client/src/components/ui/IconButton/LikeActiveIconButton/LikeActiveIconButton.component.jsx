import React from "react";

import { LikeActive as LikeActiveIcon } from "components/ui/Icon";
import IconButton from "components/ui/BaseIconButton";
import { defaultProps, propTypes } from "../IconButton.props";

LikeActiveIconButton.defaultProps = defaultProps;
LikeActiveIconButton.propTypes = propTypes;

function LikeActiveIconButton ({
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
                <LikeActiveIcon size={size} />
            </IconButton>
        </div>
    );
}

export default LikeActiveIconButton;
