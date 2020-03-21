import { func, object } from "prop-types";

export const propTypes = {
    history: object.isRequired,
    onClose: func.isRequired,
    signOutStart: func.isRequired
};
