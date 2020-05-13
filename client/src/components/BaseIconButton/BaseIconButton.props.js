import {
    arrayOf,
    bool,
    func,
    node,
    number,
    oneOf,
    oneOfType,
    string
} from "prop-types";

export const defaultProps = {
    children: null,
    className: "",
    disabled: false,
    size: 24,
    theme: "light",
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

    theme: oneOf(["light", "dark"]),

    title: string
};
