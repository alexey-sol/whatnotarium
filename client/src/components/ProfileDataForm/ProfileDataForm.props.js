import { bool, func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    isPending: false,
    notification: null
};

export const propTypes = {
    currentUser: object,
    history: object.isRequired,
    isPending: bool,
    notification: object,
    onShowNotification: func.isRequired,
    onSignOutStart: func.isRequired,
    onUpdateUserStart: func.isRequired
};
