import { bool, func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    isPending: false,
    isPreview: false
};

export const propTypes = {
    currentUser: object,
    isPending: bool,
    isPreview: bool,
    post: object.isRequired,
    onVoteForPostStart: func.isRequired
};
