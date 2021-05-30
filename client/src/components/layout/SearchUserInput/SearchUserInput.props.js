import { func, object } from "prop-types";

export const propTypes = {
    history: object.isRequired,
    onSearchUsersStart: func.isRequired,
    onSetCurrentPage: func.isRequired
};
