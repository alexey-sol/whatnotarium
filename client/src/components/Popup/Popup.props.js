import {
    func,
    number,
    oneOf,
    string
} from "prop-types";

import { ERROR, SUCCESS, WARNING } from "utils/const/notificationTypes";

export const defaultProps = {
    isFixed: false,
    text: "",
    theme: SUCCESS,
    timeoutInMs: 3000
};

export const propTypes = {
    onClose: func.isRequired,
    text: string,
    theme: oneOf([ERROR, SUCCESS, WARNING]),
    timeoutInMs: number
};
