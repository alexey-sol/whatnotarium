import {
    arrayOf,
    bool,
    func,
    node,
    number,
    oneOfType,
    string
} from "prop-types";

export const defaultProps = {
    children: null,
    className: "",
    disabled: false,
    size: 24,
    title: ""
};

export const propTypes = {
    children: oneOfType([
        arrayOf(node),
        node
    ]),

    className: string,

    disabled: bool,

    onClick: func.isRequired,

    size: number,

    title: string
};
