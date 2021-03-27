import { bool, func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    isPending: false
};

export const propTypes = {
    currentUser: object,
    history: object.isRequired,
    isPending: bool,
    match: object.isRequired,
    onResetPasswordStart: func.isRequired,
    onShowNotification: func.isRequired
};
