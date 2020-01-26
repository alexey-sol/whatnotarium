import PropTypes from "prop-types";

const { arrayOf, func, node, number, oneOfType } = PropTypes;

export const defaultProps = {
    children: null,
    size: 25
};

export const propTypes = {
    children: oneOfType([
        arrayOf(node),
        node
    ]),

    onClick: func.isRequired,

    size: number
};
