import PropTypes from "prop-types";

const { arrayOf, func, oneOfType, node, string } = PropTypes;

export const defaultProps = {
    children: null,
    rootClassName: ""
};

export const propTypes = {
    children: oneOfType([
        arrayOf(node),
        node
    ]),

    onClose: func.isRequired,

    rootClassName: string
};
