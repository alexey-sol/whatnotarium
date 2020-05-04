import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    userError: null
};

export const propTypes = {
    currentUser: object,
    onClose: func,
    onResetUserError: func.isRequired,
    onSignInStart: func.isRequired,
    showSignUpDialog: func.isRequired,
    userError: object
};
