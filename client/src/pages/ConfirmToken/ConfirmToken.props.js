import { bool, func, object } from "prop-types";

export const defaultProps = {
    isPending: false,
    supportError: null
};

export const propTypes = {
    history: object.isRequired,
    isPending: bool,
    match: object.isRequired,
    onConfirmEmailStart: func.isRequired,
    onSendConfirmTokenStart: func.isRequired,
    onShowNotification: func.isRequired,
    supportError: object
};
