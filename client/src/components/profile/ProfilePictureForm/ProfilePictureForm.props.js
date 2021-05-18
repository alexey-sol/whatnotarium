import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: null
};

export const propTypes = {
    currentUser: object,
    onUpdateUserPictureStart: func.isRequired
};
