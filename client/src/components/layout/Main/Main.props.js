import {
    arrayOf,
    bool,
    func,
    node,
    object,
    oneOfType
} from "prop-types";

export const defaultProps = {
    children: null,
    isPending: false,
    notification: null
};

export const propTypes = {
    children: oneOfType([
        arrayOf(node),
        node
    ]),
    isPending: bool,
    notification: object,
    onHideNotification: func.isRequired
};
