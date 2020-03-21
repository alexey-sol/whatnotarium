import PropTypes from "prop-types";

const { func, object } = PropTypes;

export const defaultProps = {
    currentUser: null,
    userError: null
};

export const propTypes = {
    currentUser: object,
    resetUserError: func.isRequired,
    signUpStart: func.isRequired,
    userError: object
};
