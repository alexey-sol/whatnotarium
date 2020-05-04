import { func, object } from "prop-types";

export const propTypes = {
    history: object.isRequired,
    onClose: func.isRequired,
    onSignOutStart: func.isRequired
};
