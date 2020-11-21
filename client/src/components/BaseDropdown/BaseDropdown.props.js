import {
    arrayOf,
    bool,
    func,
    instanceOf,
    object,
    oneOfType,
    node,
    string
} from "prop-types";

export const defaultProps = {
    children: null,
    containerElem: document.body,
    rootClassName: ""
};

export const propTypes = {
    children: oneOfType([
        arrayOf(node),
        node
    ]),
    elemRef: object.isRequired,
    isFixed: bool,
    onClose: func.isRequired,
    rootClassName: string,
};
