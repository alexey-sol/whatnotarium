import {
    arrayOf,
    bool,
    node,
    oneOfType,
    string
} from "prop-types";

export const defaultProps = {
    children: null,
    className: "",
    isActive: false
};

export const propTypes = {
    children: oneOfType([
        arrayOf(node),
        node
    ]),
    className: string,
    isActive: bool
};
