import PropTypes from "prop-types";

const { func, object } = PropTypes;

export const propTypes = {
    history: object.isRequired,
    onClose: func.isRequired,
    signOutStart: func.isRequired
};
