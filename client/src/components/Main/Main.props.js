import {
    arrayOf,
    func,
    node,
    object,
    oneOfType
} from "prop-types";

export const defaultProps = {
    children: null,
    notification: null
};

export const propTypes = {
    children: oneOfType([
        arrayOf(node),
        node
    ]),
    onHideNotification: func.isRequired,
    notification: object
};
