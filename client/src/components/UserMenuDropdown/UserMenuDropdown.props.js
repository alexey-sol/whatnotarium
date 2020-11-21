import { func, object } from "prop-types";

export const propTypes = {
    elemRef: object.isRequired,
    history: object.isRequired,
    onClose: func.isRequired,
    onSignOutStart: func.isRequired
};
