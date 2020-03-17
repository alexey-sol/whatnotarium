import PropTypes from "prop-types";

const { func, object } = PropTypes;

export const defaultProps = {
    userError: null
};

export const propTypes = {
    onClose: func,
    resetUserError: func.isRequired,
    signInStart: func.isRequired,
    showSignUpDialog: func.isRequired,
    userError: object
};
