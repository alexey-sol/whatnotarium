import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    sessionError: null
};

export const propTypes = {
    currentUser: object,
    onClearError: func.isRequired,
    onSignUpStart: func.isRequired,
    sessionError: object
};
