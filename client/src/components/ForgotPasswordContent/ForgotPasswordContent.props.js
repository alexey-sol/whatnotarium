import { bool, func, object } from "prop-types";

export const defaultProps = {
    isPending: false,
    notification: null
};

export const propTypes = {
    isPending: bool,
    notification: object,
    onClose: func.isRequired,
    onRestorePasswordStart: func.isRequired,
    onShowNotification: func.isRequired
};
