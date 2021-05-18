import { bool, func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    isPending: false,
    notification: null
};

export const propTypes = {
    currentUser: object,
    isPending: bool,
    notification: object,
    onShowNotification: func.isRequired,
    onUpdateUserStart: func.isRequired
};
