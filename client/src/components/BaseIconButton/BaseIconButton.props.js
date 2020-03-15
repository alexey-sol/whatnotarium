import PropTypes from "prop-types";

const { arrayOf, func, node, number, oneOfType, string } = PropTypes;

export const defaultProps = {
    children: null,
    className: "",
    size: 24,
    title: ""
};

export const propTypes = {
    children: oneOfType([
        arrayOf(node),
        node
    ]),

    className: string,

    onClick: func.isRequired,

    size: number,

    title: string
};
