import PropTypes from "prop-types";

const { arrayOf, bool, func, object, oneOfType, node, string } = PropTypes;

export const defaultProps = {
    children: null,
    className: ""
};

export const propTypes = {
    children: oneOfType([
        arrayOf(node),
        node
    ]),

    className: string,

    elementRef: object.isRequired,

    isFixed: bool,

    onClose: func.isRequired
};
