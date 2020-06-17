import PropTypes from "prop-types";

const { element, object } = PropTypes;

export const defaultProps = {
    dataToPass: {}
};

export const propTypes = {
    WrappedComponent: element.isRequired,
    dataToPass: object
};
