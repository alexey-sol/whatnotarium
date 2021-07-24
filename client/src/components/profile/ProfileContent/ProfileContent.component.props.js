import {
    arrayOf,
    node,
    oneOfType,
    string
} from "prop-types";

export const defaultProps = {
    activeTabName: "",
    children: null
};

export const propTypes = {
    activeTabName: string,
    children: oneOfType([
        arrayOf(node),
        node
    ])
};
