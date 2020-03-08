import React from "react";

import { Back as BackIcon } from "components/common/Icon";
import IconButton from "components/BaseIconButton";
import { propTypes } from "./IconButton.props";

BackIconButton.propTypes = propTypes;

function BackIconButton ({ onClick, ...rest }) {
    return (
        <IconButton
            {...rest}
            onClick={onClick}
        >
            <BackIcon />
        </IconButton>
    );
}

export default BackIconButton;
