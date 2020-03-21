import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    userError: null
};

export const propTypes = {
    currentUser: object,
    resetUserError: func.isRequired,
    updateProfileStart: func.isRequired,
    userError: object
};
