import {
    arrayOf,
    func,
    oneOf,
    oneOfType,
    node,
    string
} from "prop-types";

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
