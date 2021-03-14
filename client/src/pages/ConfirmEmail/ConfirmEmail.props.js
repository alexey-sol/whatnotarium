import { func, object } from "prop-types";

export const propTypes = {
    match: object.isRequired,
    onSendConfirmTokenStart: func.isRequired,
    onShowNotification: func.isRequired
};
