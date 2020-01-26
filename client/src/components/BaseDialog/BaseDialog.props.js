import PropTypes from "prop-types";

const { arrayOf, func, oneOfType, node, string } = PropTypes;

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

    onClose: func.isRequired
};
