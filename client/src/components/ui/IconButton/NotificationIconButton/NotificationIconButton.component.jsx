import React from "react";

import { Notification as NotificationIcon } from "components/ui/Icon";
import IconButton from "components/ui/BaseIconButton";
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
