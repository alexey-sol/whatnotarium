import { arrayOf, node, oneOfType } from "prop-types";

export const defaultProps = {
    children: null
};

export const propTypes = {
    children: oneOfType([
        arrayOf(node),
        node
    ])
};
