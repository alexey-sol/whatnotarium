import React from "react";

import { User as UserIcon } from "components/common/Icon";
import IconButton from "components/BaseIconButton";
import { propTypes } from "./IconButton.props";

UserIconButton.propTypes = propTypes;

function UserIconButton ({ onClick, ...rest }) {
    return (
        <IconButton
            {...rest}
            onClick={onClick}
        >
            <UserIcon />
        </IconButton>
    );
}

export default UserIconButton;
