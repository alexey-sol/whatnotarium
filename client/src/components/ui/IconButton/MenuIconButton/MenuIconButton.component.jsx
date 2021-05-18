import React from "react";

import { Menu as MenuIcon } from "components/ui/Icon";
import IconButton from "components/ui/BaseIconButton";
import { defaultProps, propTypes } from "../IconButton.props";

MenuIconButton.defaultProps = defaultProps;
MenuIconButton.propTypes = propTypes;

function MenuIconButton ({ onClick, size, ...rest }) {
    return (
        <IconButton
            {...rest}
            onClick={onClick}
            size={size}
            title="Меню"
        >
            <MenuIcon size={size} />
        </IconButton>
    );
}

export default MenuIconButton;
