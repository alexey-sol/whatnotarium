import { bool, func, object } from "prop-types";

export const defaultProps = {
    isPending: false
};

export const propTypes = {
    currentUser: object.isRequired,
    isPending: bool,
    onUpdateUserPictureStart: func.isRequired
};
