import PropTypes from "prop-types";

const { func, object } = PropTypes;

export const propTypes = {
    elementRef: object.isRequired,
    onClose: func.isRequired
};
