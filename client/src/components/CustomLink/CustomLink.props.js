import PropTypes from "prop-types";

const { arrayOf, node, oneOfType } = PropTypes;

export const defaultProps = {
    children: null
};

export const propTypes = {
    children: oneOfType([
        arrayOf(node),
        node
    ])
};
