import React from "react";

import { Back as BackIcon } from "components/ui/Icon";
import IconButton from "components/ui/BaseIconButton";
import { defaultProps, propTypes } from "../IconButton.props";

BackIconButton.defaultProps = defaultProps;
BackIconButton.propTypes = propTypes;

function BackIconButton ({ onClick, size, ...rest }) {
    return (
        <IconButton
            {...rest}
            onClick={onClick}
            size={size}
            title="Вернуться назад"
        >
            <BackIcon size={size} />
        </IconButton>
    );
}

export default BackIconButton;
