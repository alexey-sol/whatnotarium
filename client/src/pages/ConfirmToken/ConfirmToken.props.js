import { func, object } from "prop-types";

export const defaultProps = {
    supportError: null
};

export const propTypes = {
    history: object.isRequired,
    match: object.isRequired,
    onConfirmEmailStart: func.isRequired,
    onSendConfirmTokenStart: func.isRequired,
    onShowNotification: func.isRequired,
    supportError: object
};
