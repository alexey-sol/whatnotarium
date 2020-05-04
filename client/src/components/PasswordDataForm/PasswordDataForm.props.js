import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    userError: null
};

export const propTypes = {
    currentUser: object,
    onResetUserError: func.isRequired,
    onUpdateProfileStart: func.isRequired,
    userError: object
};
