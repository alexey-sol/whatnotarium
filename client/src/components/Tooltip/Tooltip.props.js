import PropTypes from "prop-types";

const { bool, object, oneOf, string } = PropTypes;

export const defaultProps = {
    isFixed: false,
    width: "medium"
};

export const propTypes = {
    elementRef: object.isRequired,
    isFixed: bool,
    text: string.isRequired,
    width: oneOf(["small", "medium", "large"])
};
