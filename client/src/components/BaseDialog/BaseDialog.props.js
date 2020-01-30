import PropTypes from "prop-types";

const { arrayOf, func, oneOf, oneOfType, node, string } = PropTypes;

export const defaultProps = {
    children: null,
    className: "",
    title: "",
    width: "auto"
};

export const propTypes = {
    children: oneOfType([
        arrayOf(node),
        node
    ]),

    className: string,

    onClose: func.isRequired,

    title: string,

    width: oneOf(["auto", "fixed"])
};
