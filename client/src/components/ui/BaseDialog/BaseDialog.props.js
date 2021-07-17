import {
    arrayOf,
    func,
    oneOfType,
    node,
    string
} from "prop-types";

export const defaultProps = {
    children: null,
    className: "",
    title: ""
};

export const propTypes = {
    children: oneOfType([
        arrayOf(node),
        node
    ]),
    className: string,
    onClose: func.isRequired,
    title: string
};
