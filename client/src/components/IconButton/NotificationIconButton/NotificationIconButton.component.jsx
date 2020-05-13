import React from "react";

import { Notification as NotificationIcon } from "components/Icon";
import IconButton from "components/BaseIconButton";
import { defaultProps, propTypes } from "../IconButton.props";

NotificationIconButton.defaultProps = defaultProps;
NotificationIconButton.propTypes = propTypes;

function NotificationIconButton ({ onClick, size, ...rest }) {
    return (
        <IconButton
            {...rest}
            onClick={onClick}
            size={size}
            title="Уведомления"
        >
            <NotificationIcon size={size} />
        </IconButton>
    );
}

export default NotificationIconButton;
