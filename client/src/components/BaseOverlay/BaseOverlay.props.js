import {
    arrayOf,
    func,
    oneOfType,
    node,
    string
} from "prop-types";

export const defaultProps = {
    children: null,
    rootClassName: ""
};

export const propTypes = {
    children: oneOfType([
        arrayOf(node),
        node
    ]),

    onClose: func.isRequired,

    rootClassName: string
};
