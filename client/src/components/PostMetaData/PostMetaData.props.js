import { bool, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    isPreview: false
};

export const propTypes = {
    currentUser: object,
    isPreview: bool,
    post: object.isRequired,
    userProfile: object.isRequired
};
