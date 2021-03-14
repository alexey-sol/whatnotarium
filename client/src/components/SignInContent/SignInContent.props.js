import { bool, func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    isPending: false,
    notification: null,
    onClose: null,
    sessionError: null
};

export const propTypes = {
    currentUser: object,
    history: object.isRequired,
    isPending: bool,
    notification: object,
    onClose: func,
    onSignInStart: func.isRequired,
    sessionError: object,
    showSignUp: func.isRequired
};
