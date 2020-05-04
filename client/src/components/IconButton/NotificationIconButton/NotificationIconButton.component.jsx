import React from "react";

import { Notification as NotificationIcon } from "components/Icon";
import IconButton from "components/BaseIconButton";
import { propTypes } from "../IconButton.props";

NotificationIconButton.propTypes = propTypes;

function NotificationIconButton ({ onClick, ...rest }) {
    return (
        <IconButton
            {...rest}
            onClick={onClick}
            title="Уведомления"
        >
            <NotificationIcon />
        </IconButton>
    );
}

export default NotificationIconButton;
