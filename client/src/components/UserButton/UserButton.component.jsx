import React from "react";

import { User } from "components/common/Icon";
import IconButton from "components/common/IconButton";
import { propTypes } from "./UserButton.props";

UserButton.propTypes = propTypes;

function UserButton ({ onClick }) {
    return (
        <IconButton onClick={onClick}>
            <User />
        </IconButton>
    );
}

export default UserButton;
