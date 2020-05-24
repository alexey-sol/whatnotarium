import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    onClose: null,
    userError: null
};

export const propTypes = {
    currentUser: object,
    onClose: func,
    onResetUserError: func.isRequired,
    onSignInStart: func.isRequired,
    showSignUp: func.isRequired,
    userError: object
};
