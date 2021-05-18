import { bool, func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    isPending: false,
    notification: null,
    onClose: null,
    sessionError: null,
    showForgotPass: null
};

export const propTypes = {
    currentUser: object,
    history: object.isRequired,
    isPending: bool,
    notification: object,
    onClose: func,
    onResetSessionError: func.isRequired,
    onSignInStart: func.isRequired,
    sessionError: object,
    showForgotPass: func,
    showSignUp: func.isRequired
};
