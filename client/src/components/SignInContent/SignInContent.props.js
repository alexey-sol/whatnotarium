import { bool, func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    isPending: false,
    notification: null,
    onClose: null
};

export const propTypes = {
    currentUser: object,
    isPending: bool,
    notification: object,
    onClose: func,
    onSignInStart: func.isRequired,
    showSignUp: func.isRequired
};
