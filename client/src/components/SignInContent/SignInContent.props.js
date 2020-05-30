import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    sessionError: null,
    onClose: null
};

export const propTypes = {
    currentUser: object,
    onClearError: func.isRequired,
    onClose: func,
    onSignInStart: func.isRequired,
    sessionError: object,
    showSignUp: func.isRequired
};
