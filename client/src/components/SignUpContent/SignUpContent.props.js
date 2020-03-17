import PropTypes from "prop-types";

const { func, object } = PropTypes;

export const defaultProps = {
    userError: null
};

export const propTypes = {
    resetUserError: func.isRequired,
    signUpStart: func.isRequired,
    userError: object
};
