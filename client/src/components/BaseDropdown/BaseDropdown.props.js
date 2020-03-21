import {
    arrayOf,
    bool,
    func,
    object,
    oneOfType,
    node,
    string
} from "prop-types";

export const defaultProps = {
    children: null,
    className: ""
};

export const propTypes = {
    children: oneOfType([
        arrayOf(node),
        node
    ]),

    className: string,

    elementRef: object.isRequired,

    isFixed: bool,

    onClose: func.isRequired
};
