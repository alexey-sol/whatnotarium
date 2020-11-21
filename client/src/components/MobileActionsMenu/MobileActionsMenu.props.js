import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: null
};

export const propTypes = {
    currentUser: object,
    history: object.isRequired,
    onClose: func.isRequired,
    onSignOutStart: func.isRequired,
    showSignIn: func.isRequired
};
