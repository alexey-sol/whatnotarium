import {
    arrayOf,
    bool,
    node,
    oneOfType,
    string
} from "prop-types";

export const defaultProps = {
    activeTabName: "",
    children: null,
    isPending: false
};

export const propTypes = {
    activeTabName: string,
    children: oneOfType([
        arrayOf(node),
        node
    ]),
    isPending: bool
};
