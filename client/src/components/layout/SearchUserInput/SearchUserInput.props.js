import { func, object } from "prop-types";

export const propTypes = {
    history: object.isRequired,
    location: object.isRequired,
    onSetCurrentPage: func.isRequired
};
